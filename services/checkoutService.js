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

    async getAllCheckouts() {
        try {
            const checkouts = await Checkout.find().populate('products.productId');
            return checkouts;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getCheckoutsByUserId(userId) {
        try {
            const checkouts = await Checkout.find({ userId }).populate('products.productId');
            return checkouts;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getCheckoutById(checkoutId) {
        try {
            const checkout = await Checkout.findById(checkoutId).populate('products.productId');
            return checkout;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new CheckoutService();