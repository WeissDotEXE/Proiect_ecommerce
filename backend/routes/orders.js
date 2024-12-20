import Order from "../models/Order.js";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/add", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json("Order created successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
