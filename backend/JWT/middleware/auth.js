import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(404).json({
      message: "Not authenticated",
    });
  }

  const token = authHeader.split(" ")[1]; 
  // format: Bearer TOKEN

  if (!token) {
    return res.status(404).json({
      message: "Not authenticated",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(404).json({
      message: "Not authenticated",
    });
  }
};