import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URI)
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true

        }, () => console.log("Db connected"))
    } catch (error) {
        console.log('Error : ' + error);
        process.exit(1)

    }
}

export default connectDB;