// routes/cartRouter.js
const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');

router.get('/getmyCart', CartController.getCart);
router.post('/addtoCart', CartController.addToCart);
router.delete('/remove/:productId', CartController.removeFromCart);
router.delete('/clearMyCart', CartController.clearCart);

module.exports = router;
