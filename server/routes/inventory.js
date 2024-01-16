const express = require("express");
const { verification } = require("../config/verify");
const {
  createProduct,
  updateProduct,
  getProducts,
  getProduct,
  deleteProduct,
} = require("../controller/inventory");
const router = express.Router();

router.post("/", verification, createProduct);
router.patch("/:id", verification, updateProduct);
router.get("/", verification, getProducts);
router.get("/:id", verification, getProduct);
router.delete("/:id", verification, deleteProduct);

module.exports = router;
