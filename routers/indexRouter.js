const router = require('express').Router()
const Category = require("../models/category");
const ProductCode = require("../models/productCode");
const UserModel = require("../models/userModel");

router.get('/', function(req,res){
  res.json('okokoko')
})

router.get('/admin', function(req,res){
  res.render('admin/admin')
})

router.get('/admin/productCode', async function(req,res){
  const listproductCode = await ProductCode.find()
  const listategory = await Category.find()
  res.render('admin/productCode', {listproductCode,listategory})
})

module.exports = router