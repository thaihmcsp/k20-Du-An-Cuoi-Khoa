const mongoose = require('./connectDB')

const ProductSchema = mongoose.Schema({
  listImg: [{type:String}],
  color:	[{
    name:String,
    colorImg: String
  }],
  size:	[{type:String}],
  productCode	: {ref:'productCode', type: String},
  quantity:	Number
},{ collection: 'product'})

const ProductModel = mongoose.model('product', ProductSchema)

module.exports = ProductModel
  
// ProductModel.create({
//   listImg: [
//     'https://lzd-img-global.slatic.net/g/p/44c468411ab6380ac6cb1100dc20d2a0.jpg_720x720q80.jpg_.webp',
//     'https://lzd-img-global.slatic.net/g/tps/tfs/TB1oP2bbQvoK1RjSZFNXXcxMVXa-300-200.png'
//   ],
//   color:	[
//     {name:'Nâu',
//     colorImg:"https://lzd-img-global.slatic.net/g/p/f1560d676bb18a5b63640519dba8fc25.jpg_80x80q80.jpg_.webp"
//   },
//     {name:'Đen',
//     colorImg:"https://lzd-img-global.slatic.net/g/p/1252f4085bebcf56ab41918d2db1c566.jpg_80x80q80.jpg_.webp"
//   },
//   ],
//   size: [ 'M', 'L', 'XL','K' ],
//   productCode: '62428647665944197d31ad3d',
//   quantity: 60,
// })


