const mongoose = require('./connectDB')

const CartSchema = mongoose.Schema({
  UserID: {
    type: String,
    ref:'user'
  },
  productList:	[
    {
      productID: {
        type: String, 
        ref:'product'
      },
      quantity: Number,
      select: {
        type: Boolean,
        default: false
      }
    } 
  ]
},{ collection: 'cart'})

const CartModel = mongoose.model('cart', CartSchema)

module.exports = CartModel

CartModel.create({
  UserID: 'asdasd',
  productList:	[
    {
      productID: 'asdasdasd',
      quantity: 1,
    } 
  ]
})
.then(function(data){
  console.log(data);
})
.catch(function(err){
  console.log(err);
})