const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3,},
    email: {
      type: String,
      required: true,
      minlength: 3,
      unique: true,
    },
    password: { type: String, required: true, minlength: 5},
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);


const User = mongoose.model("User", userSchema);
exports.User = User;