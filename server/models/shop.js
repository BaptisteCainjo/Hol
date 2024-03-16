import mongoose, { Schema } from "mongoose";

const imagesSchema = new Schema({
    thumbnail: String,
    gallery: [String]
});

const addressSchema = new Schema({
    street: String,
    city: String,
    postalCode: String,
    country: String
});

const hoursSchema = new Schema({
    day: String,
    periods: [{
        start: String,
        end: String
    }]
});

const shopSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    name: String,
    slug: String,
    images: imagesSchema,
    description: String,
    tags: [String],
    address: addressSchema,
    email: String,
    phoneNumber: String,
    iban: String,
    siret: String,
    openingHours: [hoursSchema],
    verified: Boolean,
}, {
    timestamps: true
});

const Shop = mongoose.model("Shop", shopSchema);

export default Shop;