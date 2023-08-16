const { Product , validate} = require("../models/product")
const express = require("express")
const router = express.Router()

router.get("/",async(req,res) =>
{
    const products = await Product.find().sort("name");
    res.send(products);
})

router.post("/",async(req,res) =>{
    const {error} = validate(req.body);
    if(error) return
})