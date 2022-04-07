const router = require("express").Router();
const ProductCode = require("../models/productCode");
const Category = require("../models/category");
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

router.post("/add", upload.single("thumbnail"), async function (req, res) {
  console.log(21,req.file.path);
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
    const listproductCode = await ProductCode.find()
    .skip((req.query.page - 1) * req.query.limit)
    .limit(req.query.limit);
    res.render("admin/dataproductCode", { listproductCode });
  } catch (error) {
    res.status(500).json({ mess: "Loi Server" });
  }
});

router.get("/get", async function (req, res) {
  const listproductCode = await ProductCode.find()
  .skip((req.query.page - 1) * req.query.limit)
  .limit(req.query.limit);
  res.render("admin/dataproductCode", { listproductCode });
});

router.get('/', async function(req,res){
  const listproductCode = await ProductCode.find()
  .limit(12)
  const totala = await ProductCode.count()
  const total = Math.ceil(totala/12)
  const listategory = await Category.find()
  res.render('admin/productCode', {listproductCode,listategory, total:total})
})



router.get("/:id", async function (req, res) {
  try {
    const list = await ProductCode.findOne({ _id: req.params.id });
    res.json(list);
  } catch (error) {
    res.status(500).json({ mess: "Loi Server" });
  }
});

router.put("/:idupdate", upload.single("chien"), async function (req, res) {
  try {
    if(req.file== undefined){
      const create = await ProductCode.updateOne({_id: req.params.idupdate},{
        code: req.body.code,
        name: req.body.name,
        categoryID: req.body.categoryID,
        price: req.body.price,
      });
      const listproductCode = await ProductCode.find()
      .skip((req.query.page - 1) * req.query.limit)
      .limit(req.query.limit);
      res.render("admin/dataproductCode", { listproductCode });
    }else{
      const create = await ProductCode.updateOne({_id: req.params.idupdate},{
        code: req.body.code,
        name: req.body.name,
        thumbnail: req.file.path,
        categoryID: req.body.categoryID,
        price: req.body.price,
      });
      const listproductCode = await ProductCode.find()
      .skip((req.query.page - 1) * req.query.limit)
      .limit(req.query.limit);
      res.render("admin/dataproductCode", { listproductCode });
    }
  } catch (error) {
    res.status(500).json({ mess: "Loi Server" });
  }
});

module.exports = router;
