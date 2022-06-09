const UserModel = require("./models/userModel");
const jwt = require('jsonwebtoken')

function checkLogin (req,res,next){
  if(req.cookies.user){
    UserModel.findOne({token: req.cookies.user})
    .then(function(data){
      if(data){
        req.id = data._id
        next()
      }else{
        res.redirect('/admin/login')
      }
    })
    .catch(function(err){
      res.status(500).json(err)
    })
  }else{
    res.redirect('/admin/login')
  }
} 

function checkUser (req,res,next){
  // console.log(24,req.cookies.user);
  if(req.cookies.user){
    // console.log(26);
    const id = jwt.verify(req.cookies.user, 'thai').id
    UserModel.findOne({_id: id})
    .then(function(data){
      if(data){
        res.redirect('/user/get')
      }else{
        res.status(400).json({mess:'cookie khong hop le'})
      }
    })
    .catch(function(err){
      res.status(500).json(err)
    })
  }else{
    next()
  }
}

// function checkRole (req,res, next){
//   const userID = req.cookies.user
//   if(userID){
//     const id = jwt.verify(userID, 'thai').id
//     if(userID){
//       UserModel.findOne({token: userID})
//       .then(function(data){
//         if(data?.role === 'admin'){
//           next()
//         }else{
//           res.redirect('/signin')
//         }
//       })
//       .catch(function(err){
//         console.log(err);
//         res.status(400).json(err)
//       })
//     }else{
//       res.redirect('/home')
//     }
//   }else{
//     res.redirect('/signin')
//   }
// } 

module.exports = {checkLogin, checkUser}