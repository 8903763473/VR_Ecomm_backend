const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
    key_id: 'rzp_test_AvyR3nh6tIT3ve',
    key_secret: 'KgLWwPOQyfealYV0lYFKMYEA'
});

class PaymentService {

    async createOrder(amount, currency) {
        const options = {
            amount: amount * 100,  // amount in the smallest currency unit (e.g., paise for INR)
            currency,
            receipt: 'order_rcptid_11'
        };

        try {
            const order = await razorpay.orders.create(options);
            return order;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature) {
        const hmac = crypto.createHmac('sha256', razorpay.key_secret);
        hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const generatedSignature = hmac.digest('hex');

        if (generatedSignature === razorpay_signature) {
            return { status: 'success' };
        } else {
            return { status: 'failure', message: 'Signature mismatch' };
        }
    }
}

module.exports = new PaymentService();