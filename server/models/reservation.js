import mongoose, { Schema } from "mongoose";
import Product from "./product.js";
import User from "./user.js";

const reservationSchema = new Schema({
    user: User.schema,
    product: Product.schema,
    state: {
        type: String,
        enum: ["pending", "confirmed", "canceled", "past"],
        default: "pending"
    },
}, {
    timestamps: true,
});

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;