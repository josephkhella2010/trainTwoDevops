import express from "express";
import User from "../../MongoDB/Model/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../JWT/generateToke.js";
const router = express.Router();

router.post("/login-user", async (req, res) => {
  try {
    const formattedUserName = (name = "", isLower = false) => {
      return isLower ? name.trim().toLowerCase() : name.trim();
    };

    const username = formattedUserName(req.body.username, true);
    const password = formattedUserName(req.body.password);
    const fields = [username, password];
    const data = { username, password };
    const messages = [];
    const fieldNames = [];

    // if all fields is empty
    const allFieldsEmpty = fields.every((fi) => !fi || fi.trim() === "");
    if (allFieldsEmpty) {
      messages.push("Please fill in all fields");
      fieldNames.push("all");
      return res.status(400).json({
        message: "please fill in all fields",
        fieldName: fieldNames,
      });
    }

    for (const [key, value] of Object.entries(data)) {
      if (!value || value.trim() === "") {
        messages.push(`Please fill ${key}`);
        fieldNames.push(key);
      }
    }

    if (messages.length > 0) {
      return res.status(400).json({
        messages,
        fieldNames,
      });
    }

    // find if user is exist

    const usernameExists = await User.findOne({ username: username });
    const emailExists = await User.findOne({ email: username });

    if (username.includes("@")) {
      if (!emailExists) {
        return res.status(400).json({
          message: "Email is not found",
          fieldName: "email",
        });
      }
    } else {
      if (!usernameExists) {
        return res.status(400).json({
          message: "Username is not found",
          fieldName: "username",
        });
      }
    }

    if (messages.length > 0) {
      return res.status(400).json({
        messages,
        fieldNames,
      });
    }
    const user = usernameExists || emailExists;
    // ✅ FIX: define password check
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    const token = generateToken(user);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        messages: ["password is not correct"],
        fieldNames: ["password"],
      });
    }

    return res
      .status(200)
      .json({ message: "user logged in Successfully", user: user, token });
  } catch (error) {
    return res.status(500).json({
      message: "error with login user method",
      error: error.message,
    });
  }
});
export default router;
