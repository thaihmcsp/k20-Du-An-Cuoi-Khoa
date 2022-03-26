const router = require('express').Router()
const CategoryModel = require('../models/category')

router.post('/',function(req,res){
    console.log(req.body);
    CategoryModel.create(
      {
        name: req.body.name	,
        thumbnail:req.body.thumbnail
      }
    )
    .then(function (data) {
        res.json({mess:'ok',data})
      })
      .catch(function (err) {
        res.json({mess:'thất bại',err})
      });
  })
module.exports = router