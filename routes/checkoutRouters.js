const express = require('express');
const checkoutController = require('../controllers/checkoutController');
const router = express.Router();

router.post('/checkoutProducts', checkoutController.createCheckout);
router.get('/getAllCheckouts', checkoutController.getAllCheckouts);
router.get('/getCheckoutsByUserId/:userId', checkoutController.getCheckoutsByUserId);
router.get('/getCheckoutById/:checkoutId', checkoutController.getCheckoutById);

module.exports = router;





  