const router = require('express').Router()
const path = require("path");
const OrderModel = require("../models/orderModel");

router.get("/get", async function (req, res) {
    const orderModel = await OrderModel.find()
    console.log(orderModel);
    res.json(orderModel)
  });

module.exports = router