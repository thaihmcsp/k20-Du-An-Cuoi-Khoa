const mongoose = require("./connectDB");

const ProductSchema = mongoose.Schema(
  {
    listImg: [{ type: String }],
    color: [
      {
        name: String,
        colorImg: String,
      },
    ],
    size: [{ type: String }],
    productCode: { ref: "productCode", type: String },
    quantity: Number,
  },
  { collection: "product" }
);

const ProductModel = mongoose.model("product", ProductSchema);

module.exports = ProductModel;
