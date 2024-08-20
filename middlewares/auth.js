import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const userAuthVerification = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({
      success: false,
      message: "Token is not available or Invalid token",
    });
  } else {
    try {
      const decoded = jwt.verify(token, "DEFAULT_SECRET_KEY");
      const userInfo = await User.findById(decoded.id);

      if (userInfo) {
        return res.status(200).json({
          success: true,
          userInfo,
        });
      }
    } catch (error) {
      return res.status(400).json({
        success: "false",
        message: "User not authenticated",
      });
    }
  }
};
