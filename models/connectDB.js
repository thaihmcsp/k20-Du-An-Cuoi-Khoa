const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.0kwab.mongodb.net/sang1?retryWrites=true&w=majority`
);

module.exports = mongoose;
