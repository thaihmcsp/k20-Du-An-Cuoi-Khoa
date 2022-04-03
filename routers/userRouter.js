const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const path = require("path");
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

router.put("/profile/change-password", async (req, res) => {
  try {
    let token = req.cookies.user;
    const user = await userModel.findOne({
      token: token,
    });
    if (user) {
      const compare = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (compare) {
        const hash = await bcrypt.hash(req.body.newPassword, 10);
        await userModel.updateOne(
          {
            token: token,
          },
          {
            password: hash,
          }
        );
        res.status(200).json("Thành công");
      } else {
        res.status(400).json({ message: "Mật khẩu hiện tại không chính xác" });
      }
    } else {
      res.status(400).json("User này không tồn tại");
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi Server" });
  }
});

router.put("/profile/edit", async (req, res) => {
  try {
    let token = req.cookies.user;
    const user = await userModel.findOne({
      token: token,
    });
    if (user) {
      await userModel.updateOne(
        {
          token: token,
        },
        {
          username: req.body.username,
          address: req.body.address,
          date: `${req.body.day}/${req.body.month}/${req.body.year}`,
          gender: req.body.gender,
        }
      );
      res.status(200).json("Edit Successfull");
    } else {
      res.status(400).json("User này không tồn tại");
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi Server" });
  }
});

router.post("/profile/upload", upload.single("avatar"), async (req, res) => {
  try {
    let token = req.cookies.user;
    await userModel.updateOne(
      {
        token: token,
      },
      {
        avatar: req.file.path,
      }
    );
    res.status(200).json("Upload thành công");
  } catch (error) {
    res.status(500).json("Lỗi Sever");
  }
});

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

router.put("/logout", async (req, res) => {
  try {
    let token = req.cookies.user;
    await userModel.updateOne(
      { token: token },
      {
        token: "",
      }
    );
    res.status(200).json({ message: "Successfull Logout" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi Server" });
  }
});

module.exports = router;
