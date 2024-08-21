const Checkout = require('../models/chckoutModel');

class CheckoutService {
    async createCheckout(checkoutData) {
        try {
            const checkout = new Checkout(checkoutData);
            await checkout.save();
            return checkout;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getmyOrdersById(checkoutId) {
        try {
            const checkout = await Checkout.findById(checkoutId).populate('products.productId');
            return checkout;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new CheckoutService();