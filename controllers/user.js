import bcryptjs from "bcryptjs";
import User from "../models/user.js";
import { registerSchema } from "../schemas/user.js";
import { generateToken } from "../utils/index.js";

export const registerUser = async (req, res, next) => {
  const { name, email, password } = await req.body;
  const { error } = registerSchema.validate({ name, email, password });
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    const isUserEmailAlreadyExists = await User.findOne({ email });
    if (isUserEmailAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "User email already exists! Please try with different email",
      });
    } else {
      const hashPassword = await bcryptjs.hash(password, 12);

      const newlyCreateUser = await User.create({
        name,
        email,
        password: hashPassword,
      });

      if (newlyCreateUser) {
        const token = generateToken(newlyCreateUser?._id);

        res.cookie("token", token, { withCredentials: true, httpOnly: false });

        res.status(201).json({
          success: true,
          message: "User registration successfully",
          userData: {
            name: newlyCreateUser.name,
            email: newlyCreateUser.email,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};
