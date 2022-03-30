const router = require('express').Router()
const Category = require("../models/category");
const ProductCode = require("../models/productCode");

router.get('/', function(req,res){
  res.json('okokoko')
})

router.get('/admin', function(req,res){
  res.render('admin/admin')
})

router.get('/admin/createuser', function(req,res){
  res.render('admin/createuser')
})

router.get('/admin/category', async function(req,res){
  const listcategory = await Category.find()
  res.render('admin/category', {listcategory})
})

router.get('/admin/productCode', async function(req,res){
  const listproductCode = await ProductCode.find()
  const listategory = await Category.find()
  res.render('admin/productCode', {listproductCode,listategory})
})

module.exports = router