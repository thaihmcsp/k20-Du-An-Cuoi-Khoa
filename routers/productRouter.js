const router = require('express').Router()

const ProductModel = require('../models/product')
const ProductCodeModel = require('../models/productCode')

router.get('/:id', async (req, res) =>{
    try {
        console.log(7,req.params.id);
        const ListData = await ProductModel.findOne({_id : req.params.id})
        console.log(8,ListData);
        const ListCode = await ProductCodeModel.findOne({_id : ListData.productCode})
        console.log(9,ListCode);
        // res.json(ListData)
        res.render('user/detail/detail', {listdata : ListData, listcode : ListCode})  
    } catch (error) {
        console.log(error); 
    }
})
// router.get('/home', async (req, res) =>{
//     try {
//         // console.log(7,req.params.id);
//         // const ListData = await ProductModel.find({_id : req.params.id})
//         // console.log(8,ListData);
//         res.render('user/detail/detail')
//     } catch (error) {
//         console.log(error); 
//     }
// })
// router.get('/list',checkUser, async (req, res) =>{ 
//     try {
//         console.log(91, req.cookies.user);
//         const User = await UserModel.findOne({token: req.cookies.user})
//         const ListData = await ListModel.find({userID: User._id})
//         res.render('page/list', {user : User, listdata: ListData})
//     } catch (error) {
//         console.log(error); 
//     }
// })

module.exports = router