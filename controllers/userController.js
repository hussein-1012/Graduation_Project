const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { User, UserRoles } = require("../models/User");
const httpStatus = require("../utils/httpStatus");
const generateJWT = require("../utils/generateJWT");
const { sendParentVerificationEmail } = require("../utils/mailer");
const {sendUserVerificationEmail} = require("../utils/sendUserVerificationEmail");

let getAllUsers = async (req, res) => {
    const query = req.query;
    const limit = parseInt(query.limit) || 10;
    const page = parseInt(query.page) || 1;
    const skip = (page - 1) * limit;

    const Users = await User.find({}, { "__v": false, "password": 0 })
        .limit(limit)
        .skip(skip);

    res.json({ status: httpStatus.SUCCESS, data: { Users } });
};

let getUser = async (req, res) => {
    const user = await User.findById(req.params.userId, { "__v": false, "password": 0 });
    if (!user) {
        return res.status(404).json({
            status: httpStatus.FAIL,
            data: { user: "User not found" }
        });
    }
    res.status(200).json({ status: httpStatus.SUCCESS, data: { user } });
};

let UpdateUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const updated = await User.updateOne({ _id: userId }, { $set: { ...req.body } });
        res.status(200).json({
            status: httpStatus.SUCCESS,
            data: { updated }
        });
    } catch (err) {
        res.status(404).json({ status: httpStatus.FAIL, error: "User not found" });
    }
};

const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        await User.deleteOne({ _id: userId });
        res.status(200).json({
            status: httpStatus.SUCCESS,
            data: "User deleted successfully"
        });
    } catch (err) {
        res.status(404).json({
            status: httpStatus.FAIL,
            error: "User not found"
        });
    }
};

let Register = async (req, res) => {
  try {
    const { fullname, email, password, role, age, parentEmail } = req.body;

    if (!fullname || !email || !password || !age) {
      return res.status(400).json({
        status: httpStatus.FAIL,
        error: "fullname, email, password and age are required.",
      });
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).json({
        status: httpStatus.FAIL,
        error: "Email already exists.",
      });
    }

    if (age < 16) {
      if (!parentEmail) {
        return res.status(400).json({
          status: httpStatus.FAIL,
          error: "You are Child, you must provide parentEmail.",
        });
      }
      if (parentEmail === email) {
        return res.status(400).json({
          status: httpStatus.FAIL,
          error: "Child email cannot be the same as parent email.",
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      role,
      age,
      parentEmail: parentEmail || null,
      parentVerified: age >= 16,
      isEmailVerified: false,
      emailVerificationToken: crypto.randomBytes(32).toString("hex"),
      emailVerificationExpires: Date.now() + 60 * 60 * 1000,
    });

    await newUser.save();
    // console.log('Sending verification email to:', newUser.email);
    // console.log('Verification token:', newUser.emailVerificationToken);
    // console.log('Verification URL:', `${process.env.BACKEND_URL}/api/verify/user?token=${newUser.emailVerificationToken}`);

    await sendUserVerificationEmail(newUser.email, newUser.emailVerificationToken);

    if (newUser.age < 16 && newUser.parentEmail) {
      const parentToken = crypto.randomBytes(32).toString("hex");
      newUser.parentVerificationToken = parentToken;
      newUser.parentVerificationExpires = Date.now() + 60 * 60 * 1000;
      await newUser.save();

      await sendParentVerificationEmail(
        newUser.parentEmail,
        parentToken,
        { childName: newUser.fullname, childEmail: newUser.email }
      );
    }

    res.status(201).json({
      status: httpStatus.SUCCESS,
      message: "User registered successfully. Please verify your email.",
      data: {
        user: {
          id: newUser._id,
          fullname: newUser.fullname,
          email: newUser.email,
          role: newUser.role,
          age: newUser.age,
          parentEmail: newUser.parentEmail,
          parentVerified: newUser.parentVerified,
          isEmailVerified: newUser.isEmailVerified,
        },
      },
    });

  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({
      status: httpStatus.ERROR,
      error: err.message || "Something went wrong during registration.",
    });
  }
};

let Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: httpStatus.FAIL,
        error: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: httpStatus.FAIL,
        message: "User not found",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        status: httpStatus.FAIL,
        message: "Invalid email or password",
      });
    }

    if (!user.isEmailVerified) {
      return res.status(400).json({
        status: httpStatus.FAIL,
        message: "Please verify your email before logging in."
      });
    }

    if (user.role === "child" && !user.parentVerified) {
      return res.status(403).json({
        status: httpStatus.FAIL,
        message: "Account is waiting for parent approval",
      });
    }

    const token = generateJWT({
      email: user.email,
      id: user._id,
      role: user.role,
      });

    res.status(200).json({
      status: httpStatus.SUCCESS,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          fullname: user.fullname,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (err) {
    res.status(500).json({ status: httpStatus.ERROR, error: err.message });
  }
};
  
module.exports = {
    getAllUsers,
    getUser,
    UpdateUser,
    deleteUser,
    Register,
    Login
};
