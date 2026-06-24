import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./MongoDB/db.js";
import mongoose from "mongoose";
// routes
import GetUsers from "./Routes/UserRoutes/GetUsers.js";
import registerUser from "./Routes/UserRoutes/RegisterUser.js";
import loginUser from "./Routes/UserRoutes/loginUser.js";

dotenv.config();
const app = express();
await connectDB();
console.log("Connected to database:", mongoose.connection.name);

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api", GetUsers);
app.use("/api", registerUser);
app.use("/api", loginUser);

app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});
