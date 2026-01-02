import express from "express";
let router = express.Router();
import User from "../models/user.js";
import passport from "passport";

router.post("/signup", async (req, res) => {
  try {
    let { username, password, email } = req.body;
    let data = new User({ username, email });
    let registerUser = await User.register(data, password);

    req.logIn(registerUser, (err) => {
      if (err) return res.json({ success: false });
      res.json({ success: true, message: username });
    });
  } catch (err) {
    res.json({ error: "some error occurred", success: false });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: "Server error",
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        error: info?.message || "User does not exist",
      });
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: "Login failed",
        });
      }

      return res.json({
        success: true,
        message: user.username,
      });
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    console.log("k");

    if (err) return res.json({ success: false });
    res.json({ success: true, message: "logged out" });
  });
});

export default router;
