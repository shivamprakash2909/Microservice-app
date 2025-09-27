import jwt from "jsonwebtoken";
export const generateToken = async (userId, res) => {
  const secretKey = "eqrfvjhb_!@#vjvrvvvvv";
  const token = jwt.sign({ userId }, secretKey, { expiresIn: "7d" });
  res.cookie("jwt-token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
};
