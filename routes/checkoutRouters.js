const express = require('express');
const checkoutController = require('../controllers/checkoutController');
const router = express.Router();

router.post('/checkoutProducts', checkoutController.createCheckout);
router.get('/getMyOrders/:id', checkoutController.getmyOrders);

module.exports = router;





  