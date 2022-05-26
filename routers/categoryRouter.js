const router = require("express").Router();
const path = require("path");
const checkRequire = require("../middleWare/checkRequire");
const UserModel = require("../models/userModel");
const Category = require("../models/category");
const ProductCode = require("../models/productCode");
const { checkLogin, checkUser } = require("../checkLogin");
var multer = require("multer");
const { log } = require("console");
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

// Admin
router.get("/get", async function (req, res) {
  console.log(345);
  const listcategory = await Category.find()
    .skip((req.query.page - 1) * req.query.limit)
    .limit(req.query.limit);
  res.render("admin/datacategory", { listcategory });
});

router.get("/", checkLogin, async function (req, res) {
  try {
    const listcategory = await Category.find().limit(10);
    const totala = await Category.count();
    const total = Math.ceil(totala / 10);
    console.log(totala);
    res.render("admin/category", { listcategory, total: total });
  } catch (error) {
    console.log(error);
  }
});

// Home
router.get("/:id", checkRequire, async (req, res) => {
  const category = await Category.findOne({
    _id: req.params.id,
  });
  res.render("user/filter/filter", { user: req.user, category });
});

router.post("/add", upload.single("thumbnail"), async function (req, res) {
  try {
    console.log(41, req.file);
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

router.delete("/:id", async function (req, res) {
  try {
    const data = await Category.deleteOne({ _id: req.params.id });
    const datacategory = await ProductCode.deleteOne({
      categoryID: req.params.id,
    });
    const listcategory = await Category.find()
      .skip((req.query.page - 1) * req.query.limit)
      .limit(req.query.limit);
    res.render("admin/datacategory", { listcategory });
  } catch (error) {
    res.status(500).json({ mess: "Lỗi server" });
  }
});

router.put("/:id", upload.single("thumbnail"), async function (req, res) {
  try {
    if (req.file === undefined) {
      const update = await Category.updateOne(
        { _id: req.params.id },
        {
          name: req.body.name,
        }
      );
      const listcategory = await Category.find()
        .skip((req.query.page - 1) * req.query.limit)
        .limit(req.query.limit);
      res.render("admin/datacategory", { listcategory });
    } else {
      const update = await Category.updateOne(
        { _id: req.params.id },
        {
          name: req.body.name,
          thumbnail: req.file.path,
        }
      );
      const listcategory = await Category.find()
        .skip((req.query.page - 1) * req.query.limit)
        .limit(req.query.limit);
      res.render("admin/datacategory", { listcategory });
    }
  } catch (error) {
    res.status(500).json({ mess: "Lỗi server" });
  }
});

router.get("/:id", async function (req, res) {
  const data = await Category.findOne({ _id: req.params.id });
  res.json(data);
});

router.put("/:id", upload.single("thumbnail"), async function (req, res) {
  try {
    if (req.file === undefined) {
      const update = await Category.updateOne(
        { _id: req.params.id },
        {
          name: req.body.name,
        }
      );
      res.json(update);
    } else {
      const update = await Category.updateOne(
        { _id: req.params.id },
        {
          name: req.body.name,
          thumbnail: req.file.path,
        }
      );
      res.json(update);
    }
  } catch (error) {
    res.status(500).json({ mess: "Lỗi server" });
  }
});

router.post("/", function (req, res) {
  console.log(req.body);
  CategoryModel.create({
    name: req.body.name,
    thumbnail: req.body.thumbnail,
  })
    .then(function (data) {
      res.json({ mess: "ok", data });
    })
    .catch(function (err) {
      res.json({ mess: "thất bại", err });
    });
});

module.exports = router;
