const router = require("express").Router();
const Product = require("../models/product");
const path = require("path");
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

router.get("/:id", async function (req, res) {
  const listproduct = await Product.find({ productCode: req.params.id });
  res.render("admin/listproduct", { listproduct });
});

router.post("/add", upload.array("listImg", 5), async function (req, res) {
  let arr = req.headers.referer.split("/");
  let length = arr.length;
  var arrimg = [];
  for (let i = 0; i < req.files.length; i++) {
    arrimg.push(req.files[i].path);
  }
  const data = await Product.create({
    listImg: arrimg,
    color: req.body.color,
    size: req.body.size,
    productCode: arr[length - 1],
    quantity: req.body.quantity,
  });
  res.json(data);
});

router.delete("/:id", async function (req, res) {
  try {
    const data = await Product.deleteOne({ _id: req.params.id });
    res.json(data);
  } catch (error) {
    console.log(47, error);
  }
});

router.get("/get/:idup", async function (req, res) {
  const data = await Product.findOne({ _id: req.params.idup });
  res.json(data);
});

router.put(
  "/:idupdate",
  upload.array("listimgid", 5),
  async function (req, res) {
    var arrimg = [];
    for (let i = 0; i < req.files.length; i++) {
      arrimg.push(req.files[i].path);
    }
    if (arrimg.length == 0) {
      const update = await Product.updateOne(
        { _id: req.params.idupdate },
        {
          color: req.body.colorid,
          size: req.body.sizeid,
          quantity: req.body.quantityid,
        }
      );
      res.json(update);
    } else {
      const update = await Product.updateOne(
        { _id: req.params.idupdate },
        {
          listImg: arrimg,
          color: req.body.colorid,
          size: req.body.sizeid,
          quantity: req.body.quantityid,
        }
      );
      res.json(update);
    }
  }
);

module.exports = router;
