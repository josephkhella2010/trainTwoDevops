import express from "express";
import User from "../../MongoDB/Model/User.js";
import bcrypt from "bcrypt";
const router = express.Router();

router.post("/register-user", async (req, res) => {
  try {
    const formattedUserName = (name = "", isLower = false) => {
      return isLower ? name.trim().toLowerCase() : name.trim();
    };

    const username = formattedUserName(req.body.username, true);
    const email = formattedUserName(req.body.email, true);
    const password = formattedUserName(req.body.password);
    const rePassword = formattedUserName(req.body.rePassword);
    const fields = [username, email, password, rePassword];
    const data = { username, email, password, rePassword };
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
    // if password and rePassword is not match

    if (password !== rePassword) {
      messages.push("Passwords do not match");
      fieldNames.push("password", "rePassword");
      return res.status(400).json({ message: messages, fieldName: fieldNames });
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

    const usernameExists = await User.findOne({ username });
    const emailExists = await User.findOne({ email });

    if (usernameExists) {
      messages.push("Username is already exist");
      fieldNames.push("username");
    }

    if (emailExists) {
      messages.push("Email is already exist");
      fieldNames.push("email");
    }

    if (messages.length > 0) {
      return res.status(400).json({
        messages,
        fieldNames,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      items: [],
    });

    return res
      .status(200)
      .json({ message: "user registered Successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({
      message: "error with register user method",
      error: error.message,
    });
  }
});
export default router;
