const router = require('express').Router()
const ProductModel = require('../models/product')
const ProductCodeModel = require('../models/productCode')
const CartModel = require('../models/cartModel')
const { checkUser } = require("../middleWare/checkLogin");
const cookieParser = require('cookie-parser')
router.use(cookieParser())

router.get('/:id', async (req, res) =>{
    try {
        console.log(7,req.params.id);
        const ListCode = await ProductCodeModel.findOne({_id : req.params.id})
        const ListData = await ProductModel.find({productCode : req.params.id})
        let color = []
        let size = []
        for (let i = 0; i < ListData.length; i++) {
            if (color.indexOf(ListData[i].color) === -1) {
                color.push(ListData[i].color,i) 
            }  
            if (size.indexOf(ListData[i].size) === -1) {
                size.push(ListData[i].size,i) 
            }  
        }
        // console.log(200,color);
        // console.log(300,size);
        // console.log(2000,ListCode);
        // console.log(3000,ListData);
        res.render('user/detail/detail', {listdata : ListData, listcode : ListCode, listcolor: color, listsize: size})  
    } catch (error) {
        console.log(error); 
    }
})
router.get('/change/mau', async (req, res) =>{
    try {
        console.log(36,req.query.mau);
        // console.log(37,req.query.idcode);
        const ListData = await ProductModel.find({color : req.query.mau ,  productCode: req.query.idcode} )
        console.log(39,ListData);
        res.render('user/detail/zoomImg.ejs',{listdata :ListData})
    } catch (error) {
        console.log(error); 
    }
})
router.get('/check/size', async (req, res) =>{ 
    try {
        const size = []
        console.log(91,req.query.mau);
        const ListData = await ProductModel.find({color : req.query.mau ,  productCode: req.query.idcode} )
        // console.log(52,ListData);
        for (let i = 0; i < ListData.length; i++) {
            if (size.indexOf(ListData[i].size) === -1) {
                size.push(ListData[i].size) 
            } 
        }
        // console.log(44444,size);
        res.json(size)
    } catch (error) {
        console.log(error); 
    }
})
router.get('/check/color', async (req, res) =>{ 
    try {
        const color = []
        console.log(61,req.query.size);
        const ListData = await ProductModel.find({size : req.query.size ,  productCode: req.query.idcode} )
        // console.log(63,ListData);
        for (let i = 0; i < ListData.length; i++) {
            if (color.indexOf(ListData[i].color) === -1) {
                color.push(ListData[i].color) 
            } 
        }
        // console.log(5555,color);
        res.json(color)
    } catch (error) {
        console.log(error); 
    }
})
router.get('/check/:color&:size&:id&:quantity',checkUser, async (req, res) =>{ 
    try {
        console.log(77,req.params);
        const ListData = await ProductModel.findOne(
            {size : req.params.size ,color : req.params.color, productCode: req.params.id} )
        // console.log(79,ListData);
        // console.log(80,ListData.quantity );// số lượng hàng ban đầu
        // console.log(81,req.params.quantity); // số lượng hàng muốn đặt mua
        const data = await CartModel.findOne({UserID : req.id, "productList.productID": ListData._id } )
        if (data) {
            // console.log(82,data.productList[0].quantity); // số lượng hàng đã bỏ vào cart
            if (ListData.quantity < (Number(req.params.quantity) + data.productList[0].quantity ) ) {
                res.json({mess: 'Hàng tồn không đủ', quantity : ListData.quantity})
            }else{
                res.json(ListData)
            }
        } else {
            if (ListData.quantity < Number(req.params.quantity  ) ) {
                res.json({mess: 'Hàng tồn không đủ', quantity : ListData.quantity})
            }else{
                res.json(ListData)
            }
        }
        
        
    } catch (error) {
        console.log(error); 
    }
})

module.exports = router