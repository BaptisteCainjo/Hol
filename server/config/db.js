import mongoose from "mongoose";
import "dotenv/config";

const connectToDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.ATLAS_URI);
        console.log("Connected successfully to database !");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectToDatabase;