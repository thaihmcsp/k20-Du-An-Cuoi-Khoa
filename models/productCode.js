const mongoose = require('./connectDB')

const ProductCodeSchema = mongoose.Schema({
  code:	String,
  name:	String,
  thumbnail:	String,
  categoryID:	{type: String, ref:'category'},
  price: Number
},{collection: 'productCode'})

const ProductCodeModel = mongoose.model('productCode', ProductCodeSchema)

module.exports = ProductCodeModel

