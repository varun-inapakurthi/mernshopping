import asyncHandler from "express-async-handler"
import User from './../models/userModel.js'

import generateToken from './../utils/generateToken.js'

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    console.log("email", email)
    console.log("password", password)
    let user = await User.findOne({ email })
    if (user && await (user.matchPasssword(password))) {
        user = user.toObject();
        user.token = generateToken(user._id)
        delete user.password
        res.json(user)
    } else {
        res.status(401);
        throw new Error("Invalid Credentials")
    }
})
const registerUser = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body
    let userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }
    let user = await User.create({ name, email, password })
    // delete user.password
    user = user.toObject();
    user.token = generateToken(user._id)
    delete user.password
    if (user) {
        res.json(user)
    } else {
        throw new Error("Invalid user data")
    }
})
const getUserProfie = asyncHandler(async (req, res) => {
    res.json(req.user)
})
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})
const updateUserProfie = asyncHandler(async (req, res) => {
    if (req.user) {
        console.log(req.body.name)
        req.user.name = req.body.name || req.user.name
        req.user.email = req.body.email || req.user.email
        if (req.body.password) {
            req.user.password = req.body.password
        }
        await req.user.save()
        await delete req.user.password
        res.json(req.user)
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})
// const deleteUser = asyncHandler(async (req, res) => {
//     await User.deleteMany({})
// })
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.remove();
        res.json({ message: "User removed" })

    } else {
        res.status(404);
        throw new Error("User not found")
    }
})


const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
        res.json(user)
    } else {
        res.status(404);
        throw new Error("User not found")
    }
})


const updateUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

export { authUser, getUserProfie, registerUser, deleteUser, updateUserProfie, getUsers, getUserById, updateUser }