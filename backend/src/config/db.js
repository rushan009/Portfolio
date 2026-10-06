import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected Scucessfully", connection.connection.host);
        

    } catch (error) {
        console.error(error);
        process.exit(1);

    }
}