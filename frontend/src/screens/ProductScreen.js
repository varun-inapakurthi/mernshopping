import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { createProductReview, listProductDetails } from "../actions/productActions";
import Loader from "../components/loader";
import Message from "../components/message";
import { PRODUCT_CREATE_REVIEW_REQUEST } from "../constants/productConstants";
import Meta from "../components/Meta";
// import axios from "axios";

const ProductScreen = ({ match, history }) => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const { product, error, loading } = useSelector(state => state.productDetails)
    const { success: successProductReview, error: errorProductReview } = useSelector(state => state.productReviewCreate)
    const { userInfo } = useSelector(state => state.userLogin)
    const dispatch = useDispatch()
    useEffect(() => {

        if (successProductReview) {
            alert("Review Submitted")
            setRating(0)
            setComment('')
            dispatch({
                type: PRODUCT_CREATE_REVIEW_REQUEST
            })
        }
        dispatch(listProductDetails(match.params.id))


    }, [dispatch, match.params.id, successProductReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating, comment
        }))
    }
    return (<>
        <Link to="/" className="btn btn-light my-3">
            Go Back</Link>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <>
            <Meta title={product.name} />

            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating}
                                text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price: </Col>
                                    <Col>
                                        <strong>${product.price}</strong> </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status: </Col>
                                    <Col>
                                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty
                                    </Col>
                                        <Form.Control as="select" value={qty}
                                            onChange={(e) => setQty(e.target.value)}
                                        >
                                            {[...Array(product.countInStock).keys()].map(x => (
                                                <option value={x + 1} key={x + 1}>{x + 1}</option>
                                            ))}
                                        </Form.Control>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <Button onClick={addToCartHandler} className="btn btn-block" type="button" disabled={product.countInStock === 0}>
                                    Add To Cart
                            </Button>
                            </ListGroup.Item>
                        </ListGroup></Card></Col>
            </Row>

            <Row>
                <Col md={6}>
                    <h2>Reviews</h2>
                    {console.log(product)}
                    {!product.reviews.length && <Message> No Reviews</Message>}

                    <ListGroup variant="flush">
                        {product.reviews.length > 0 && product.reviews.map(pr => (
                            <ListGroup.Item key={pr._id}>
                                <strong>{pr.name}</strong>
                                <Rating value={pr.rating} />
                                <p>{pr.createdAt.substring(0, 10)}</p>
                                <p>{pr.comment}</p>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                            <h2>Write a review</h2>
                            {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
                            {userInfo ? (<>
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId="rating">
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>

                                            <option value="" disabled>Select...</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="comment">
                                        <Form.Control as='textarea'
                                            row="3"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        >

                                        </Form.Control>

                                        <Button type="submit" variant="primary">Submit</Button>

                                    </Form.Group>
                                </Form>
                            </>) : <Message>Please <Link to='/login'>Sign in</Link> to review
                            {' '}
                                </Message>}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
            </Row>
        </>

        }
    </>);
}

export default ProductScreen;