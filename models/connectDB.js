const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://sang1409:sang1234@cluster0.0kwab.mongodb.net/sang1?retryWrites=true&w=majority"
);

module.exports = mongoose;
