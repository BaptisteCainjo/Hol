import mongoose, { Schema } from "mongoose";

const imagesSchema = new Schema({
    thumbnail: String,
    gallery: [String]
});

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    stock: Number,
    details: Schema.Types.Mixed,
    tags: [String],
    images: imagesSchema,
    shop: {
        type: Schema.Types.ObjectId,
        ref: "Shop"
    }
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema);

export default Product;