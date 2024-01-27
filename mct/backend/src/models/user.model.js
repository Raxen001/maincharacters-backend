const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  bank_id: {
    type: String,
    required: true,
    unique: true,
  },
  wallet_id: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};