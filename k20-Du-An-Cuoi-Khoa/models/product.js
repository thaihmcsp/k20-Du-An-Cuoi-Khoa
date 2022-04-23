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

// ProductModel.find()
// .then(function(data){
//   console.log(data);
// })
// .catch(function(err){
//   console.log(err);
// })



