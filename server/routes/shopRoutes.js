import { Router } from "express";
import { createShop, deleteShop, getShop, getShops } from "../controllers/shopController.js";
import { uploadMiddleware, processImage } from "../middlewares/imageMiddleware.js";

const router = Router();

router.route("/")
    .get(getShops)
    .post(uploadMiddleware.single("thumbnail"), processImage, createShop)

router.get("/:shopSlug", getShop);

router.delete("/:shopId", deleteShop);

export default router;