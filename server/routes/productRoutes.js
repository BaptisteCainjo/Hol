import { Router } from "express";
import { getProduct, getProducts, deleteProduct, updateProduct, createProduct } from "../controllers/productController.js";

const router = Router();

router.get("/:shopId/products", getProducts);
router.post("/:shopId/products", createProduct);

router.route("/:shopId/products/:productId")
    .get(getProduct)
    .put(updateProduct)
    .delete(deleteProduct);

export default router;