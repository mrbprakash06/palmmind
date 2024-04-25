const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  description: String,
});

const User = mongoose.model("User", userSchema); 

exports.userSchema = userSchema;
exports.User = User; 
