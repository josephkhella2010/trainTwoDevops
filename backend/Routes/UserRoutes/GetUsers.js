import express from "express";
import User from "../../MongoDB/Model/User.js";

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json({ message: "get users Successfully", users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error with get users method", error: error.message });
  }
});
export default router;
