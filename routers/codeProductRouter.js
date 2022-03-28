const router = require('express').Router()
const ProductCodeModel = require('../models/productCode')

router.post('/',function(req,res){
    console.log(req.body);
    ProductCodeModel.create(
      {
        code:	req.body.code,
        name:	req.body.name,
        price:  req.body.price
      }
    )
    .then(function (data) {
        res.json({mess:'ok',data})
      })
      .catch(function (err) {
        res.json({mess:'thất bại',err})
      });
  })

  router.get('/',function(req,res){
    console.log(req.query.name);
    ProductCodeModel.find(
        {name:{$regex:req.query.name,$options:'i'}}
      )
      .skip((req.query.page-1) *req.query.limit)
      .limit(req.query.limit)
      .then(function (data) {
          res.json({mess:'ok',data})
        })
        .catch(function (err) {
          res.json({mess:'thất bại',err})
        });
  })
  
  // router.get('/',function(req,res){
  //   console.log(req.query.name);
  //   ProductCodeModel.find(
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




module.exports = router