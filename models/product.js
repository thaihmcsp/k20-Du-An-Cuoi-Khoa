const mongoose = require('./connectDB')

const ProductSchema = mongoose.Schema({
  listImg: [{type:String}],
  color:	String,
  size:	String,
  productCode	: {ref:'productCode', type: String},
  quantity:	Number
},{ collection: 'product'})

const ProductModel = mongoose.model('product', ProductSchema)

module.exports = ProductModel

// ProductModel.create({
//   listImg: ["https://lzd-img-global.slatic.net/g/p/57d0984162fc976c56d080ced8d537f1.jpg_120x120q80.jpg_.webp",
//             "https://lzd-img-global.slatic.net/g/p/8030a134847b17844ec0b6f7cfc75f73.jpg_120x120q80.jpg_.webp",
//             "https://lzd-img-global.slatic.net/g/p/d56770381dd9777d8d1bd109ff9fe7f0.jpg_120x120q80.jpg_.webp",
//             "https://lzd-img-global.slatic.net/g/p/f07d0f35bd05311ab61dfae3c75dfd8b.jpg_120x120q80.jpg_.webp",
//             "https://lzd-img-global.slatic.net/g/p/b5cc587e8eac93868967340d7a248c39.jpg_120x120q80.jpg_.webp"
// ],
//   color:	"Đen",
//   size:	String,
//   productCode	: '62428647665944197d31ad3d',
//   quantity:	100
// })
// .then(function(data){
//   console.log(data);
// })
// .catch(function(err){
//   console.log(err);
// })
