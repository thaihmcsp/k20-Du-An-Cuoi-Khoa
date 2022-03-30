const mongoose = require('./connectDB')

const CategorySchema = mongoose.Schema({
  name	: String,
  thumbnail: String
},{collection: 'category'})

const CategoryModel = mongoose.model('category', CategorySchema)

module.exports = CategoryModel

// CategoryModel.create({
//   name	: 'Quần',
//   thumbnail: '/public/upload/avatarDefault.jpg'
// },{
//   name	: 'ÁO',
//   thumbnail: '/public/upload/avatarDefault.jpg'
// }).then(data => console.log(data))
