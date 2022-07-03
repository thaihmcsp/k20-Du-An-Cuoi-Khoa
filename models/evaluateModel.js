const mongoose = require("./connectDB");

const evaluateSchema = mongoose.Schema({
  userID: {
    type: String,
    ref: "user",
  },
  productCodeID: {
    type: String,
    ref: "productCode",
  },
  star: Number,
  content: String,
});

const evaluateModel = mongoose.model("product", evaluateSchema);

module.exports = evaluateModel;
