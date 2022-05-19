const router = require('express').Router()
const path = require('path')
const {checkLogin, checkUser, checkRole} = require('../checkLogin')
const UserModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const ListModel = require('../models/ListModel')

router.get('/test', async function(req,res){
  try {
    const listData = await UserModel.find()
    // console.log(listData);
    res.render('test', { list: listData})
  } catch (error) {
    res.status(500).json({mess:'loi server'})
  }
})

router.get('/home', function(req,res){ // gửi 1 thông điệp về đường dẫn /home
  res.sendFile(path.join(__dirname, ('../views/home.html')))
})

router.get('/signup', function(req, res){
  res.sendFile(path.join(__dirname,'../views/signup.html'))
})

router.get('/job', function(req,res){
  res.sendFile(path.join(__dirname, '../views/todo.html'))
})

// router.get('/list', checkLogin, function(req,res){
//   res.sendFile(path.join(__dirname, '../views/list.html'))
// })

router.get('/signin', checkUser ,function(req,res){
  res.sendFile(path.join(__dirname,'../views/signin.html'))
})

router.get('/admin', checkRole ,function(req,res){
  res.sendFile(path.join(__dirname, '../views/admin.html'))
})
router.get('/profile', function(req,res){
  res.sendFile(path.join(__dirname, '../views/profile.html'))
})

router.get('/test1', function(req,res){
  setTimeout(function(){
    res.json('da het 3s')
  }, 3000)
})

router.get('/test2', function(req,res){
  setTimeout(function(){
    res.json('da het 4s')
  }, 4000)
})

router.get('/daskboard', function(req,res){
  res.render('daskboard/daskboard')
})

router.get('/daskboard/user', function(req,res){
  res.render('daskboard/daskboardUser')
})

router.get('/list' ,async function(req,res){
  try {
    const listData = await ListModel.find({userID: req.id})
    res.render('pages/listPage/list', {listData})
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get('/pagination' ,async function(req,res){
  try {
    console.log(req.query);
    let findObject = {}
    for (const key in req.query) {
      let data = req.query[key].split(',')
      findObject[key] = {$in : data}
    }
    console.log(findObject);
    const listUser = await UserModel.find(findObject).limit(3)
    const total = await UserModel.find(findObject)
    let filter = {
      role:[],
      age:[],
      mark:[] 
    }
    for(let i = 0; i<total.length ;i++){
      if( filter.age.indexOf(total[i].age) === -1 ){
        filter.age.push(total[i].age)
      }
      if( filter.role.indexOf(total[i].role) === -1 ){
        filter.role.push(total[i].role)
      }
      if( filter.mark.indexOf(total[i].mark) === -1 ){
        filter.mark.push(total[i].mark)
      }
    }
    console.log(findObject);
    res.render('pages/pagination/pagination', {findObject, listUser, filter: filter, total: Math.ceil(total.length/3) })
  } catch (error) {
    res.status(500).json(error)
  }
})


module.exports = router