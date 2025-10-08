const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    category: {type: String, required: [true, "Category is required"] },
    inStock: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
