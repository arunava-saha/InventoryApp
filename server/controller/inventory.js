const asyncHandler = require("express-async-handler");
const Product = require("../model/productSchema");
const Profile = require("../model/userSchema");
// const { fileSizeFormatter } = require("../utils/fileUpload");
// const cloudinary = require("cloudinary").v2;

// Create Prouct
const createProduct = asyncHandler(async (req, res) => {
  const { title, price, createdBy, createdAt } = req.body;

  //   Validation
  if (!title || !createdBy || !price || !createdAt) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }
  const user = await Profile.findOne({ email: req.body.email });

  // Create Product
  const product = await Product.create({
    user: user,
    title,
    createdAt,
    createdBy,
    price,
  });

  res.status(201).json(product);
});

// Get all Products
const getProducts = asyncHandler(async (req, res) => {
  const user = await Profile.findOne({ email: req.body.email });
  const products = await Product.find({ user: user }).sort("-createdAt");
  res.status(200).json(products);
});

// Get single product
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  const user = await Profile.findOne({ email: req.body.email });
  // Match product to its user
  if (!user) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(product);
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const user = await Profile.findOne({ email: req.body.email });
  // Match product to its user
  if (!user) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "Product deleted." });
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
  const { title, price, createdBy, createdAt } = req.body;
  const { id } = req.params;

  const product = await Product.findById(id);

  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  const user = await Profile.findOne({ email: req.body.email });
  // Match product to its user

  if (!user) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Update Product
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      title,
      price,
      createdBy,
      createdAt,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
