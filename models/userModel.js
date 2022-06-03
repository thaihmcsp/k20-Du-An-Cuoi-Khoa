const mongoose = require("./connectDB");

const UserSchema = mongoose.Schema(
  {
    username: String,
    password: String,
    email: String,
    gender: String,
    address: String,
    date: String,
    avatar: {
      type: String,
      default: "/public/upload/avatarDefault.png",
    },
    role: {
      type: String,
      default: "user",
    },
    searchHistory: [{ type: String }],
    token: String,
  },
  { collection: "user" }
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
