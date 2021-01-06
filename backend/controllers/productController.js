import asyncHandler from "express-async-handler"
import Product from './../models/productModel.js'

const getProducts = asyncHandler(async (req, res) => {



    const pageSize = 3;

    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(

        pageSize * (page - 1)
    )
    res.json({ products, page, pages: Math.ceil(count / pageSize) })
})
const getProductById = asyncHandler(async (req, res) => {
    let product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404).json({
            message: "Product not found."
        })
    }
})
const deleteProduct = asyncHandler(async (req, res) => {
    let product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({ messsage: 'Product removed' })
    } else {
        res.status(404).json({
            message: "Product not found."
        })
    }
})
const createProduct = asyncHandler(async (req, res) => {

    const product = new Product({
        name: "Smample name",
        price: 0,
        user: req.user._id,
        image: '/image/sample.jpg',
        brand: "Sample brand",
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: "Sample description"

    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})
const updateProduct = asyncHandler(async (req, res) => {


    const { name, price, description, image, brand, category, countInStock } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        product.image = image
        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')

    }

})
const createProductReview = asyncHandler(async (req, res) => {


    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {

        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Prodcut already reviewed')
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((a, b) => b.rating + a, 0) / product.reviews.length;

        await product.save()
        res.status(201).json({ message: "Review added" })
    } else {
        res.status(404)
        throw new Error('Product not found')

    }

})
const getTopProducts = asyncHandler(async (req, res) => {

    console.log(">>>>>>>>>>>>>>")

    const products = await Product.find({}).sort({ rating: -1 }).limit(3)

    res.json(products)

})

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct, getTopProducts, createProductReview }