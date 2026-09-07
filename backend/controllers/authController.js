import User1 from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next("All fields are required!");
    }

    const exisitingUser = await User1.findOne({ email });

    if (exisitingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User1.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: `Hey ${user.name}, Your account has been created with ${user.email}`,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next("All fields are required!");
    }

    const matchEmail = await User1.findOne({ email });
    if (!matchEmail) {
      return next("Invalid email or password");
    }

    const matchPassword = await bcrypt.compare(password, matchEmail.password);

    if (matchPassword) {
      return next("Invalid email or password");
    }

    const token = jwt.sign(
      {
        userId: matchEmail._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: `You logged in with ${matchEmail.email}`,
    });
  } catch (error) {
    console.log(error);
  }
};
