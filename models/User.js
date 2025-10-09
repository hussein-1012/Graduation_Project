const mongoose = require("mongoose");
const validator = require("validator");

const UserRoles = {
  CHILD: "child",
  ADULT: "adult",
  PARENT: "parent",
  THERAPIST: "therapist",
  ADMIN: "admin",
};

const UserSchema = new mongoose.Schema(
  {
    fullname: { 
      type: String, 
      required: true, 
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid Email Address"],
    },
   
    isEmailVerified: { type: Boolean, default: false },
   
    emailVerificationToken: { type: String },
    
    emailVerificationExpires: { type: Date },
    
    password: {
      type: String,
      required: true 
    },
    age: {
      type: Number,
      required: true,
      min: [0, "Age must be a positive number"],
    },
    role: {
      type: String,
      enum: Object.values(UserRoles),
      default: UserRoles.CHILD,
    },

    parentEmail: {
      type: String,
      lowercase: true,
      validate: {
        validator: (v) => !v || validator.isEmail(v),
        message: "Invalid parent email",
      },
    },
    parentVerified: { type: Boolean, default: false },
    
    parentVerificationToken: { type: String },
    
    parentVerificationExpires: { type: Date },
    
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = { User, UserRoles };
