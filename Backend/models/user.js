import mongoose from "mongoose";
import pkg from "passport-local-mongoose";

const passportLocalMongoose = pkg.default ?? pkg;

let userSchema = new mongoose.Schema({
  email: { type: String, required: true },
});

userSchema.plugin(passportLocalMongoose);

export default mongoose.model("User", userSchema);
