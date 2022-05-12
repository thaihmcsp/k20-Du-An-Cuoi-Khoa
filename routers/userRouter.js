const router = require("express").Router();
const path = require("path");
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
var { checkLogin, checkUser } = require("../checkLogin");

router.post("/finduser", async function (req, res) {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    // console.log(10,user);
    if (user) {
      const password = await UserModel.findOne({ password: req.body.password });
      if (password) {
        const token = jwt.sign({ id: user._id }, "thai");
        await UserModel.updateOne({ _id: user._id }, { token: token });
        res.cookie("user", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        res.status(200).json({ mess: "thanh cong" });
      }else{
        res.status(400).json({ mess: "sai password" });
      }
    } else {
      res.status(400).json({ mess: "sai email" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/logout", function (req, res) {
  let token = req.cookies.user;
  UserModel.updateOne(
    { token: token },
    {
      token: "",
    }
  )
    .then(function (data) {
      res.status(200).json({ mess: "logout ok" });
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});

router.get("/get", checkLogin, async function (req, res, next) {
  const user = await UserModel.find().limit(10);
  const total = await UserModel.count();
  const totalPage = Math.ceil(total / 10);
  res.render("admin/createUser", { user, totalPage: totalPage });
});

router.get("/admin/get", async function (req, res) {
  const user = await UserModel.find()
    .skip((req.query.page - 1) * req.query.limit)
    .limit(req.query.limit);
  res.render("admin/manage", { user });
});

router.get("/:id", async function (req, res) {
  const profile = await UserModel.findOne({ _id: req.params.id });
  res.json(profile);
});

router.put("/:idedit", async function (req, res) {
  try {
    const profile = await UserModel.updateOne(
      { _id: req.params.idedit },
      {
        role: req.body.role,
      }
    );
    const user = await UserModel.find()
      .skip((req.query.page - 1) * req.query.limit)
      .limit(req.query.limit);
    res.render("admin/manage", { user });
  } catch (error) {
    res.status(500).json({ mess: "Loi server" });
  }
});

module.exports = router;
