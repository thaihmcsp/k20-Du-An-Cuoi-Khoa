const mongoose = require('./connectDB')

const UserSchema = mongoose.Schema({
  fullName:	String,
  password:	String,
  email:	String,
  avatar:	{
    type: String,
    default: '/public/upload/avatarDefault.jpg'
  },
  role:	{
    type: String,
    default: 'user'
  },
  token:	String,
}, {collection: 'user'})

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel

// UserModel.create({
//   email: 'admin',
//   password: 'admin',
//   role: 'admin'
// }).then(data=>{console.log(data);})



