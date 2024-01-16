const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Profile",
  },
  createdBy: { type: String, required: true },
  id: String,
  title: { type: String, required: true },
  price: { type: String, required: true },
  createdAt: String,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
