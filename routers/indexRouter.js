const router = require('express').Router()
const UserModel = require("../models/userModel");
var { checkLogin, checkUser } = require("../checkLogin");

router.get('/', function(req,res){
  res.json('okokoko')
})

router.get("/admin/login",checkUser, (req, res) => {
  res.render("admin/signIn/signIn", { user: req.user });
});

module.exports = router