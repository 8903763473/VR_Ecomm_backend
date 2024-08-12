const Product = require('../models/productModel');

class ProductService {
    async createProduct(productData) {
        try {
            // Check if a product with the same name and category already exists
            const existingProduct = await Product.findOne({
                productName: productData.productName,
                productCategory: productData.productCategory,
            });

            if (existingProduct) {
                throw new Error('Product with the same name and category already exists.');
            }

            // If not found, create a new product
            const product = new Product(productData);
            return await product.save();
        } catch (error) {
            throw new Error(`Error creating product: ${error.message}`);
        }
    }

    async getProducts() {
        try {
            return await Product.find();
        } catch (error) {
            throw new Error(`Error fetching products: ${error.message}`);
        }
    }

    async getProductById(productId) {
        try {
            const product = await Product.findById(productId);
            if (!product) {
                throw new Error('Product not found');
            }
            return product;
        } catch (error) {
            throw new Error(`Error fetching product by ID: ${error.message}`);
        }
    }

    async updateProduct(productId, updateData) {
        try {
            const product = await Product.findByIdAndUpdate(productId, updateData, { new: true });
            if (!product) {
                throw new Error('Product not found');
            }
            return product;
        } catch (error) {
            throw new Error(`Error updating product: ${error.message}`);
        }
    }

    async deleteProduct(productId) {
        try {
            const product = await Product.findByIdAndDelete(productId);
            if (!product) {
                throw new Error('Product not found');
            }
            return { message: 'Product deleted successfully' };
        } catch (error) {
            throw new Error(`Error deleting product: ${error.message}`);
        }
    }

    async getProductsByCategory(category) {
        try {
            return await Product.find({ productCategory: category });
        } catch (error) {
            throw new Error(`Error fetching products by category: ${error.message}`);
        }
    }






    async getHighOfferProducts() {
        try {
            // Example criterion: discount greater than 20%
            return await Product.find({ productDiscount: { $gt: 20 } });
        } catch (error) {
            throw new Error(`Error fetching high offer products: ${error.message}`);
        }
    }

    async getNewProducts() {
        try {
            // Example criterion: products created in the last 30 days
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            return await Product.find({ createdAt: { $gte: thirtyDaysAgo } });
        } catch (error) {
            throw new Error(`Error fetching new products: ${error.message}`);
        }
    }

    async getBestProducts() {
        try {
            // Example criterion: rating above 4.5
            return await Product.find({ productRating: { $gte: 4.5 } });
        } catch (error) {
            throw new Error(`Error fetching best products: ${error.message}`);
        }
    }

    async getLatestProducts() {
        try {
            // Example criterion: products created in the last 7 days
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            return await Product.find({ createdAt: { $gte: sevenDaysAgo } });
        } catch (error) {
            throw new Error(`Error fetching latest products: ${error.message}`);
        }
    }

    // async getBestSellerProducts() {
    //     try {
    //         // Assuming you have a field 'salesCount' or similar
    //         return await Product.find().sort({ salesCount: -1 }).limit(10);
    //     } catch (error) {
    //         throw new Error(`Error fetching best seller products: ${error.message}`);
    //     }
    // }

    // async getSpecialProducts() {
    //     try {
    //         // Assuming you have a field 'isSpecial'
    //         return await Product.find({ isSpecial: true });
    //     } catch (error) {
    //         throw new Error(`Error fetching special products: ${error.message}`);
    //     }
    // }


}

module.exports = new ProductService();
