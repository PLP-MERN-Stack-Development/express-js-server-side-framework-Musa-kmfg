const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const logger = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const productRoutes = require('./routes/productRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(logger);

// Use routes
app.use('/api/products', auth, productRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Product API..........');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running..... PLSEAS WAIT" ));
