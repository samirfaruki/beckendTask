const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

// Create a new product
router.post('/products', productController.createProduct);

// Get all products
router.get('/products', productController.getAllProducts);


// Get  products by category
router.get('/products/:category', productController.getProductsByCategory);

// Delete a product by ID
router.delete('/products/:productId', productController.deleteProductById);

module.exports = router;
