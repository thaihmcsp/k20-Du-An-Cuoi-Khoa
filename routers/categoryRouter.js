const router = require("express").Router();
const path = require("path");
const UserModel = require("../models/userModel");
const Category = require("../models/category");
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload");
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

router.post("/add", upload.single("thumbnail"), async function (req, res) {
  try {
    const check = await Category.find({ name: req.body.name });
    if (check == "") {
      const data = await Category.create({
        name: req.body.name,
        thumbnail: req.file.path,
      });
      res.status(200).json({ mes: "Thêm thành công" });
    } else {
      res.status(400).json({ mess: "Thư mục đã tồn tại" });
    }
  } catch (error) {
    res.status(500).json({ mess: "Lỗi server" });
  }
});

router.get("/:id", async function (req, res) {
  const data = await Category.findOne({ _id: req.params.id });
  res.json(data);
});

router.delete("/:id", async function (req, res) {
  try {
    const data = await Category.deleteOne({ _id: req.params.id });
    const listcategory = await Category.find();
    res.render("admin/category", { listcategory });
  } catch (error) {
    res.status(500).json({ mess: "Lỗi server" });
  }
});

router.put("/:id", upload.single("thumbnail"), async function (req, res) {
  try {
    if(req.file === undefined){
      const update = await Category.updateOne({ _id: req.params.id },{
        name: req.body.name
      });
      res.json(update);
    }else{
      const update = await Category.updateOne({ _id: req.params.id },{
        name: req.body.name,
        thumbnail: req.file.path
      });
      res.json(update);
    }
  } catch (error) {
    res.status(500).json({ mess: "Lỗi server" });
  }
});

module.exports = router;
