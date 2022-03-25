const router = require('express').Router()
const ProductModel = require('../models/product')


router.get('/',function(req,res){
  console.log(req.query.color);
    ProductModel.find(
      {color:{$regex:req.query.color,$options:'i'}}
    )
    .then(function (data) {
        res.json({mess:'ok',data})
      })
      .catch(function (err) {
        res.json({mess:'thất bại',err})
      });
})

module.exports = router