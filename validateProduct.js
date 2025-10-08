const validateProduct = (req, res, next) => {
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (typeof price !== 'number' || price < 0) {
        return res.status(400).json({ message: "Price must be a positive number" });
    }

    next();
};

module.exports = validateProduct;
