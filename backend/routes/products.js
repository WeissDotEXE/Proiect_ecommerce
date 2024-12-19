const router = require("express").Router();
const Product = require("../models/Product");

// Fetch all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add a product
router.post("/add", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json("Product added successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json("Product deleted successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
