import Product from "../models/product.js";
import Shop from "../models/shop.js";

// @desc Get a user's shop
// @route GET /api/users/:userId/shop
const getUserShop = async (req, res) => {
    try {
        const { userId } = req.params;
        const userShop = await Shop.findOne({
            owner: userId
        });
        const shopProducts = await Product.find({
            shop: userShop._id
        });
        res.status(200).json({userShop, shopProducts});
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération de la boutique et des produits."
        });
    }
};

export { getUserShop };