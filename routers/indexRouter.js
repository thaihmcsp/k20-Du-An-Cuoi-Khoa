const router = require('express').Router()
const Category = require("../models/category");
const ProductCode = require("../models/productCode");
const UserModel = require("../models/userModel");

router.get('/', function(req,res){
  res.json('okokoko')
})

module.exports = router