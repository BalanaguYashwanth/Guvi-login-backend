const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      unique:true,
      required: true,
      ref: "Auth",
    },
    name: {
      type: String,
      unique: true,
      required: [true, "Please add the name"],
    },
    email:{
      type: String,
      required: [true, "Please add the email"],
    },
    age: {
      type: Number,
      required: [true, "Please add the age"],
    },
    gender: {
      type: Number,
      enum: [1, 2, 3],
      required: [true, "Please add the gender"],
    },
    dob: {
      type: String,
      required: [true, "Please add the dob"],
    },
    phone: {
      type: String,
      required: [true, "Please add the phone number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
