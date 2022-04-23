const router = require("express").Router();
const { log } = require("console");
const path = require("path");
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.post("/register", async (req, res) => {
  try {
    console.log(23, req.body);
    const user = await userModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      const hash = await bcrypt.hash(req.body.password, 10);
      await userModel.create({
        email: req.body.email,
        password: hash,
        username: req.body.username,
      });
      res.status(200).json({ message: "Successfull" });
    } else {
      res.status(400).json({ message: "Email này đã tồn tại" });
    }
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({
      email: req.body.email,
    });
    if (user) {
      const compare = await bcrypt.compare(req.body.password, user.password);
      if (compare) {
        const token = jwt.sign({ id: user._id }, "1234");
        await userModel.updateOne(
          { _id: user._id },
          {
            token: token,
          }
        );
        res.cookie("user", token, {
          expires: new Date(Date.now() + 7 * 24 * 3600 * 1000),
        });
        res.status(200).json({ message: "Thành công" });
      } else {
        res
          .status(400)
          .json({ message: "Email hoặc mật khẩu không chính xác" });
      }
    } else {
      res.status(400).json({ message: "Email hoặc mật khẩu không chính xác" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi Server" });
  }
});





router.get('/admin/get',async function(req,res){
  const user = await UserModel.find()
  .skip((req.query.page - 1) * req.query.limit)
  .limit(req.query.limit)
  res.render('admin/manage',{user})
})

router.get('/get',async function(req,res){
  const user = await UserModel.find()
  .limit(5)
  const total = await UserModel.count()
  const totalPage = Math.ceil(total/5)
  res.render('admin/createuser',{user, totalPage: totalPage})
})

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
  .limit(req.query.limit)
  res.render('admin/manage',{user})
  } catch (error) {
    res.status(500).json({mess: 'Loi server'})
  }
});


module.exports = router;
