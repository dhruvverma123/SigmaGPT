import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import chatRoutes from "./routes/chat.js";
import cors from "cors";
import passport from "passport";
import passportLocal from "passport-local";
import User from "./models/user.js";
import user from "./routes/user.js";
import session from "express-session";
import MongoStore from "connect-mongo";
const LocalStrategy = passportLocal.Strategy;

const app = express();

app.use(express.json());
app.use(cors());

const store = MongoStore.create({
  mongoUrl: process.env.MONGO_ATLAS_URL,
  crypto: {
    secret: process.env.SECRET_KEY,
  },
  touchAfter: 24 * 3600,
});

app.use(
  session({
    store: store,
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize()); //for passport
app.use(passport.session()); //for passport
passport.use(new LocalStrategy(User.authenticate())); //for passport local

passport.serializeUser(User.serializeUser()); //for passport
passport.deserializeUser(User.deserializeUser()); //for passport

app.use("/api", chatRoutes);
app.use("/user", user);

let main = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ATLAS_URL);
    console.log("connected to database!");
  } catch (err) {
    console.log(err);
  }
};

app.listen(process.env.PORT, (req, res) => {
  console.log(`server is running at ${process.env.PORT}`);
  main();
});
