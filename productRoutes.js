const express = require('express');
const router = express.Router();
const Product = require('Product');
const validateProduct = require('validateProduct');


// GET — single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// create product
router.post('/', validateProduct, async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// update product
router.put('/:id', validateProduct, async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated)
            return res.status(404).json({ message: "Product not found" });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Delete product
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET THE product stats
router.get('/stats/category', async (req, res) => {
    try {
        const stats = await Product.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
