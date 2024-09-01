const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const CartService = require('./services/cartService');
const socketIo = require('socket.io');
const http = require('http');
require('dotenv').config();
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Routes
const userRoutes = require('./routes/userRouter');
const categoryRoutes = require('./routes/categoryRouter');
const productRoutes = require('./routes/productRouter');
const cartRoutes = require('./routes/cartRouters');
const paymentRoutes = require('./routes/paymentRouters');
const checkoutRoutes = require('./routes/checkoutRouters');
const contactRoutes = require('./routes/contactRouters');
const feedbackRoutes = require('./routes/feedbackRouters');

app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/feedback', feedbackRoutes);

// SOCKET------------------------------------------------------------
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:8100',
        methods: ['GET', 'POST'],
    },
    transports: ['websocket', 'polling']
});

io.on('connection', (socket) => {
    console.log('New client connected', socket.id);

    socket.on('joinRoom', (userId) => {
        socket.join(userId);
        console.log(`User ${socket.id} joined room ${userId}`);
    });

    socket.on('getCart', async (userId) => {
        try {
            const cart = await CartService.getCart(userId);
            socket.emit('cartData', cart);

            // Optionally listen to cart changes in the database (using a watcher or similar)
            const changeStream = CartService.watchCartChanges(userId); // Hypothetical watcher
            changeStream.on('change', async () => {
                const updatedCart = await CartService.getCart(userId);
                socket.emit('cartData', updatedCart);
            });

            // Clean up the watcher when the socket disconnects
            socket.on('disconnect', () => {
                console.log('Client disconnected');
                if (changeStream) changeStream.close();
            });

        } catch (error) {
            socket.emit('error', { message: error.message });
        }
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const port = 8000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
