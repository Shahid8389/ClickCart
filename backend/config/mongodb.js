import mongoose from "mongoose";

const connectDb = async () => {

    try {
        mongoose.connection.on('connected', () => {
            console.log("Connected to the mongoDB.");
        })

        await mongoose.connect(`${process.env.MONGODB_URI}/ClickCart`);

    } catch (error) {
        console.log("Can't connect to MongoDb database!");
    }

}

export default connectDb;