import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Button, Col, Form, Row } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, register, updateUser } from '../actions/userAction';
import Loader from '../components/loader';
import Message from '../components/message';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import Axios from 'axios';
const ProductEditScreen = ({ match, history }) => {


    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const productUpdate = useSelector(state => state.productUpdate);
    const { success: successUpdate, loading: loadingUpdate, error: errorUpdate } = productUpdate;

    const productId = match.params.id


    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        }

    }, [successUpdate, dispatch, history])

    useEffect(() => {
        dispatch(listProductDetails(productId))
    }, [productId, dispatch])
    useEffect(() => {
        if (!loading) {
            setName(product.name)
            setPrice(product.price)
            setBrand(product.brand)
            setImage(product.image)
            setCountInStock(product.countInStock)
            setCategory(product.category)
            setDescription(product.description)
        }
    }, [product, loading])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]

        const formData = new FormData()

        formData.append('image', file)

        try {

            const config = {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            }

            const { data } = await Axios.post('/api/upload', formData, config);

            setImage(data)
            setUploading(false)

        } catch (error) {

            console.log(error)

            setUploading(false)
        }

    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: product._id,
            name,
            brand,
            category,
            price,
            image,
            description,
            countInStock
        }))

    }

    return (
        <>
            <Link to='/admin/productlist' className="btn btn-light my-3">
                Go Back
        </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                            ></Form.Control>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number"
                                placeholder="Price"
                                value={price}
                                onChange={(e) => {
                                    setPrice(e.target.value)
                                }}
                            ></Form.Control>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="text"
                                placeholder="Image"
                                value={image}
                                onChange={(e) => {
                                    setImage(e.target.value)
                                }}
                            ></Form.Control>
                            <Form.File id="image-file"
                                label="Choose file"
                                custom
                                onChange={uploadFileHandler}
                            ></Form.File>
                            {uploading && <Loader />}
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type="text"
                                placeholder="Brand"
                                value={brand}
                                onChange={(e) => {
                                    setBrand(e.target.value)
                                }}
                            ></Form.Control>

                            <Form.Label>Count</Form.Label>
                            <Form.Control type="number"
                                placeholder="Count"
                                value={countInStock}
                                onChange={(e) => {
                                    setCountInStock(e.target.value)
                                }}
                            ></Form.Control>
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text"
                                placeholder="Category"
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value)
                                }}
                            ></Form.Control>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                            ></Form.Control>
                            <Button type="submit">Update</Button>
                        </Form.Group>

                    </Form>
                )}

            </FormContainer>
        </ >
    );
}

export default ProductEditScreen;