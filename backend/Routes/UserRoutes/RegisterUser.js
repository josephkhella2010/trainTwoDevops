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

    // if all fields is empty
    const allFieldsEmpty = fields.every((fi) => !fi || fi.trim() === "");
    if (allFieldsEmpty) {
      return res.status(400).json({
        message: "please fill in all fields",
        fieldName: "all",
      });
    }
    // if password and rePassword is not match

    if (password !== rePassword) {
      return res.status(400).json({ message: "passwords do not match" });
    }

    for (const [key, value] of Object.entries(data)) {
      if (!value || value.trim() === "") {
        return res.status(400).json({
          message: `please fill in ${key}`,
          fieldName: key,
        });
      }
    }

    // find if user is exist

    const existUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existUser) {
      return res
        .status(400)
        .json({ message: "user is already exist please  try to login" });
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
