const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/CreateProducts', productController.createProduct);
router.get('/getAllProducts', productController.getAllProducts);
router.get('/getProductsById/:id', productController.getProductById);
router.put('/updateProducts/:id', productController.updateProduct);
router.delete('/deleteProduct/:id', productController.deleteProduct);
router.get('/getProductsByCategory/:category', productController.getProductsByCategory);


router.get('/getHighOfferProducts', productController.getHighOfferProducts);
router.get('/getNewProducts', productController.getNewProducts);
router.get('/getBestProducts', productController.getBestProducts);
router.get('/getLatestProducts', productController.getLatestProducts);

// router.get('/getBestSellerProducts', productController.getBestSellerProducts);
// router.get('/getSpecialProducts', productController.getSpecialProducts);


module.exports = router;
