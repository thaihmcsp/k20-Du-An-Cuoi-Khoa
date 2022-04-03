const router = require("express").Router();
const { log } = require("console");
const path = require("path");
const UserModel = require("../models/userModel");


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
