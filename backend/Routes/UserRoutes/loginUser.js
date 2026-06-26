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

    // if all fields are empty
    const allFieldsEmpty = fields.every((fi) => !fi || fi.trim() === "");

    if (allFieldsEmpty) {
      return res.status(400).json({
        messages: ["Please fill in all fields"],
        fieldNames: ["all"],
      });
    }

    // Validate individual fields
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

    // Find user
    const usernameExists = await User.findOne({ username: username });
    const emailExists = await User.findOne({ email: username });

    if (username.includes("@")) {
      if (!emailExists) {
        return res.status(400).json({
          messages: ["Email is not found"],
          fieldNames: ["email"],
        });
      }
    } else {
      if (!usernameExists) {
        return res.status(400).json({
          messages: ["Username is not found"],
          fieldNames: ["username"],
        });
      }
    }

    const user = usernameExists || emailExists;

    // Check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        messages: ["Password is not correct"],
        fieldNames: ["password"],
      });
    }

    // Generate token
    const token = generateToken(user);

    // Remove password before sending user
    const userData = user.toObject();
    delete userData.password;

    return res.status(200).json({
      message: "User logged in Successfully",
      user: userData,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error with login user method",
      error: error.message,
    });
  }
});

export default router;
