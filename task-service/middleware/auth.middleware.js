import jwt from "jsonwebtoken";
export const authMiddleware = async (req, res, next) => {
  const secretKey = "eqrfvjhb_!@#vjvrvvvvv";
  const token = req.cookies["jwt-token"];
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};
