import Product from "../models/product.js";
import Shop from "../models/shop.js";

// @desc Get products
// @route GET /api/shops/:shopId/products
const getProducts = async (req, res) => {
    try {
        const { shopId } = req.params;
        const products = await Product.find({
            shop: shopId
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors du chargement des produits de la boutique."
        });
    }
};

// @desc Get a product
// @route GET /api/shops/:shopId/products/:productId
const getProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors du chargement du produit."
        });
    }
};

// @desc Create a product
// @route POST /api/shops/:shopId/products
const createProduct = async (req, res) => {
    try {
        const { shopId } = req.params;
        const { name, description, price, stock } = req.body;
        const shop = await Shop.findById(shopId);
        if (!shop) return res.status(404).json({
            message: "Boutique non trouvée."
        });
        const newProduct = new Product({
            name,
            description,
            price,
            stock,
            shop,
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la création du produit."
        });
    }
};

// @desc Update a product
// @route PUT /api/shops/:shopId/products/:productId
const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);

        if (!product) return res.status(404).json({
            message: "Produit non trouvé."
        });

        const { name, description, price, stock, details } = req.body;
        product.name = name;
        product.description = description;
        product.price = price;
        product.stock = stock;
        product.details = details;

        await product.save();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la modification du produit."
        });
    }
};

// @desc Delete a product
// @route DELETE /api/shops/:shopId/products/:productId
const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        await product.deleteOne();
        res.status(200).json(productId);
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la suppression du produit."
        });
    }
};

export { getProducts, getProduct, createProduct, deleteProduct, updateProduct };