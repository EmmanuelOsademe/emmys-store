import mongoose from "mongoose";

let isConnected = false; // Track connection

export const connectToMongoDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log("MongoDB is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI as string, {});
        isConnected = true;
        console.log("MongoDB is now connected");
    } catch (e:any) {
        console.log("Error connecting to MongoDB");
        console.log("Error: " + e.message);
    }
}