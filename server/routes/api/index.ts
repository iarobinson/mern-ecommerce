const apiIndexRouter = require('express').Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');
const addressRoutes = require('./address');
const newsletterRoutes = require('./newsletter');
const productRoutes = require('./product');
const categoryRoutes = require('./category');
const brandRoutes = require('./brand');
const contactRoutes = require('./contact');
const merchantRoutes = require('./merchant');
const cartRoutes = require('./cart');
const orderRoutes = require('./order');
const reviewRoutes = require('./review');
const wishlistRoutes = require('./wishlist');

// auth routes
apiIndexRouter.use('/auth', authRoutes);

// user routes
apiIndexRouter.use('/user', userRoutes);

// address routes
apiIndexRouter.use('/address', addressRoutes);

// newsletter routes
apiIndexRouter.use('/newsletter', newsletterRoutes);

// product routes
apiIndexRouter.use('/product', productRoutes);

// category routes
apiIndexRouter.use('/category', categoryRoutes);

// brand routes
apiIndexRouter.use('/brand', brandRoutes);

// contact routes
apiIndexRouter.use('/contact', contactRoutes);

// merchant routes
apiIndexRouter.use('/merchant', merchantRoutes);

// cart routes
apiIndexRouter.use('/cart', cartRoutes);

// order routes
apiIndexRouter.use('/order', orderRoutes);

// Review routes
apiIndexRouter.use('/review', reviewRoutes);

// Wishlist routes
apiIndexRouter.use('/wishlist', wishlistRoutes);

module.exports = apiIndexRouter;
