const router = require('express').Router()
const ProductModel = require('../models/product')

router.get('/', function(req,res){
  res.json('okokoko')
})

router.get('/search', function(req,res){
  res.render('user/filter/filter.ejs')
})

router.post('/search/?size',function(req,res){
  console.log(req.body)
  ProductModel.create({
    quantity:req.body.quantity,
    size:	req.body.size,
    color: req.body.color
  })
  .then(function (data) {
    res.json({mess:'ok',data})
  })
  .catch(function (err) {
    res.json({mess:'thất bại',err})
  });
})
module.exports = router