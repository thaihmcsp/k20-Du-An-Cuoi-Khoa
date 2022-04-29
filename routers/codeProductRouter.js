const router = require("express").Router();
const ProductCode = require("../models/productCode");
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

// Home
router.get("/pagination", async (req, res) => {
  const listproductCode = await ProductCode.find()
    .skip((req.query.page - 1) * 4)
    .limit(4);
  res.render("user/home/product", { listproductCode });
});

router.get("/:id", async (req, res) => {});

// Product Code
router.post("/", function (req, res) {
  console.log(req.body);
  ProductCode.create({
    code: req.body.code,
    name: req.body.name,
    price: req.body.price,
  })
    .then(function (data) {
      res.json({ mess: "ok", data });
    })
    .catch(function (err) {
      res.json({ mess: "thất bại", err });
    });
});

router.get("/", function (req, res) {
  console.log(req.query.name);
  ProductCode.find({ name: { $regex: req.query.name, $options: "i" } })
    .skip((req.query.page - 1) * req.query.limit)
    .limit(req.query.limit)
    .then(function (data) {
      res.json({ mess: "ok", data });
    })
    .catch(function (err) {
      res.json({ mess: "thất bại", err });
    });
});

// router.get('/',function(req,res){
//   console.log(req.query.name);
//   ProductCode.find(
//       {name:{$regex:req.query.name,$options:'i'}}
//     )
//     .skip((req.query.page-1) *req.query.limit)
//     .limit(req.query.limit)
//     .then(function (data) {
//         res.json({mess:'ok',data})
//       })
//       .catch(function (err) {
//         res.json({mess:'thất bại',err})
//       });
// })

router.post("/add", upload.single("thumbnail"), async function (req, res) {
  try {
    const create = await ProductCode.create({
      code: req.body.code,
      name: req.body.name,
      thumbnail: req.file.path,
      categoryID: req.body.categoryID,
      price: req.body.price,
    });
    res.json(create);
  } catch (error) {
    res.status(500).json({ mess: "Loi Server" });
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const listdelete = await ProductCode.deleteOne({ _id: req.params.id });
    res.json(listdelete);
  } catch (error) {
    res.status(500).json({ mess: "Loi Server" });
  }
});

router.get("/:id", async function (req, res) {
  try {
    const list = await ProductCode.findOne({ _id: req.params.id });
    res.json(list);
  } catch (error) {
    res.status(500).json({ mess: "Loi Server" });
  }
});

router.put("/:idupdate", upload.single("thumbnail"), async function (req, res) {
  try {
    if (req.file.path == "") {
      const create = await ProductCode.updateOne(
        { _id: req.params.idupdate },
        {
          code: req.body.code,
          name: req.body.name,
          categoryID: req.body.categoryID,
          price: req.body.price,
        }
      );
      res.json(create);
    } else {
      const create = await ProductCode.updateOne(
        { _id: req.params.idupdate },
        {
          code: req.body.code,
          name: req.body.name,
          thumbnail: req.file.path,
          categoryID: req.body.categoryID,
          price: req.body.price,
        }
      );
      res.json(create);
    }
  } catch (error) {
    res.status(500).json({ mess: "Loi Server" });
  }
});

module.exports = router;
