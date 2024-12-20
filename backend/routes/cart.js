import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { Router } from "express";

const router = Router();

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate("productList");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/add", async (req, res) => {
  const { userId, product } = req.body;

  if (!userId || !product) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  try {
    let newProduct = new Product(product);
    newProduct = await newProduct.save();

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        productList: [newProduct],
      });
    } else {
      cart.productList.push(newProduct);
    }

    await cart.save();

    const populatedCart = await Cart.findOne({ userId }).populate(
      "productList"
    );

    return res
      .status(200)
      .json({ message: "Cart updated successfully", cart: populatedCart });
  } catch (error) {
    console.error("Error updating cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({
      message: "Cart updated successfully!",
      cart: updatedCart,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:userId", async (req, res) => {
  const { userId } = req.body;
  try {
    await Cart.findOneAndDelete({ userId });
    res.json("Cart deleted successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
