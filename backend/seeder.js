import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js'

dotenv.config();
connectDB()

const importData = async () => {
    try {

        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleData = products.map(p => {
            return { ...p, user: adminUser }
        })
        await Product.insertMany(sampleData)
        process.exit(1)
    } catch (error) {
        console.log('error', error)
        process.exit(1)
    }
}
const destroyData = async () => {
    try {

        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()
        process.exit(1)
    } catch (error) {
        console.log('error', error)
        process.exit(1)
    }
}
if (process.argv[2] === '-d') {
    destroyData()
    console.log('destroyed succesfully')
} else {
    importData()
}