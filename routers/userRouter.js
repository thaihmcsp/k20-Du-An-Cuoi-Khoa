const router = require("express").Router();
const path = require("path");
const UserModel = require("../models/userModel");


router.post("/createadmin", async function (req, res) {
  try {
    const user = await UserModel.find({ fullName: req.body.fullName });
    console.log(user);
    if (!user) {
      const data = await UserModel.create({
        fullName: req.body.fullName,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role,
      });
      res.status(200).json({ mess: "Bạn đã đăng ký tài khoản thành công" });
    } else {
      res.json({ mess: "Tài khoản này đã có người đăng ký" });
    }
  } catch (error) {
    res.status(500).json({ mess: "Bạn đăng ký thất bạn" });
  }
});



module.exports = router;
