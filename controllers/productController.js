const productService = require('../services/productService');

class ProductController {
    async createProduct(req, res) {
        try {
            const product = await productService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllProducts(req, res) {
        try {
            const products = await productService.getProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getProductById(req, res) {
        try {
            const product = await productService.getProductById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const product = await productService.updateProduct(req.params.id, req.body);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            const product = await productService.deleteProduct(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getProductsByCategory(req, res) {
        try {
            const products = await productService.getProductsByCategory(req.params.category);
            if (products.length === 0) {
                return res.status(404).json({ message: 'No products found for this category' });
            }
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }



    async getHighOfferProducts(req, res) {
        try {
            const products = await productService.getHighOfferProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getNewProducts(req, res) {
        try {
            const products = await productService.getNewProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getBestProducts(req, res) {
        try {
            const products = await productService.getBestProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getLatestProducts(req, res) {
        try {
            const products = await productService.getLatestProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getSpecialProducts(req, res) {
        try {
            const products = await productService.getSpecialProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // async getBestSellerProducts(req, res) {
    //     try {
    //         const products = await productService.getBestSellerProducts();
    //         res.status(200).json(products);
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // }


}



module.exports = new ProductController();