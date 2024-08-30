const checkoutService = require('../services/checkoutService');

class CheckoutController {
    async createCheckout(req, res) {
        try {
            const checkout = await checkoutService.createCheckout(req.body);
            res.status(201).json(checkout);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllCheckouts(req, res) {
        try {
            const checkouts = await checkoutService.getAllCheckouts();
            res.status(200).json(checkouts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCheckoutsByUserId(req, res) {
        try {
            console.log(req.params.userId);
            const checkouts = await checkoutService.getCheckoutsByUserId(req.params.userId);
            res.status(200).json(checkouts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCheckoutById(req, res) {
        try {
            console.log(req.params.checkoutId);
            const checkout = await checkoutService.getCheckoutById(req.params.checkoutId);
            res.status(200).json(checkout);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new CheckoutController();