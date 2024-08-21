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

    async getmyOrders(req, res) {
        try {
            const checkout = await checkoutService.getmyOrdersById(req.params.id);
            res.status(200).json(checkout);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new CheckoutController();