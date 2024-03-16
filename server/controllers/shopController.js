import Shop from "../models/shop.js";
import Product from "../models/product.js";
import slugify from "../utils/functions/slugify.js";
import User from "../models/user.js";

// @desc Get shops
// @route GET /api/shops
const getShops = async (req, res) => {
    try {
        const shops = await Shop.find();
        res.status(200).json(shops);
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors du chargement des boutiques."
        });
    }
}

// @desc Create a shop
// @route POST /api/shops
const createShop = async (req, res) => {
    try {
        const owner = await User.findOne({ email: req.body.email });
        if (!owner) {
            res.status(404).json({
                message: "Utilisateur non trouvé."
            });
        }

        const newShop = new Shop({
            owner,
            name: req.body.shopName,
            slug: slugify(req.body.shopName),
            images: {
                //thumbnail: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,
                thumbnail: "",
                gallery: [],
            },
            description: "",
            address: {
                street: req.body.shopAddress,
                city: "Laval",
                postalCode: "53000",
                country: "France"
            },
            email: req.body.email,
            phoneNumber: req.body.shopTel,
            iban: req.body.shopIban,
            siret: req.body.shopSiret,
            verified: false
        });
        await newShop.save();
        res.status(201).json(newShop);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Erreur lors de la création de la boutique.",
        });
    }
}

// @desc Get a shop
// @route GET /api/shops/:shopSlug
const getShop = async (req, res) => {
    try {
        const { shopSlug } = req.params;
        const shop = await Shop.findOne({
            slug: shopSlug
        });
        const products = await Product.find({
            shop: shop._id
        });

        const shopWithProducts = {
            ...shop.toObject(),
            products,
        };
        res.status(200).json(shopWithProducts);
    } catch (err) {
        res.status(500).json({
            message: "Erreur lors du chargement de la boutique."
        });
    }
}

// @desc Delete a shop
// @route DELETE /api/shops/:shopId
const deleteShop = async (req, res) => {
    try {
        const { shopId } = req.params;
        const shop = await Shop.find({_id: shopId});
        await shop.deleteOne();
        res.status(204).json(shopId);
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la suppression de la boutique."
        });
    }
}

export { getShops, createShop, getShop, deleteShop };