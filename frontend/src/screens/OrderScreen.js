import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { deliverOrder, getOrderDetails, payOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/loader';
import Message from '../components/message';
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants';
import { resetCart } from '../actions/cartActions';
const OrderScreen = ({ match }) => {
    const orderId = match.params.id;

    const [sdkReady, setSdkReady] = useState(false)



    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails);
    const { loading, error, order } = orderDetails

    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin
    const orderDeliver = useSelector(state => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver



    if (!loading && order) {
        order.itemsPrice = order.orderItems.reduce((a, b) => a + b.price * b.qty, 0);
    }



    useEffect(() => {

        if (successDeliver) {
            window.location.href = '/admin/orderlist'
        }

    }, [successDeliver])


    useEffect(() => {
        if (successPay) {
            dispatch(resetCart())
        }
    }, [successPay, dispatch])
    useEffect(() => {
        dispatch(getOrderDetails(orderId))

    }, [orderId, dispatch])
    useEffect(() => {
        // const addPayPalScript = async () => {

        //     const { data: clientId } = await Axios.get('/api/config/paypal');
        //     console.log('clientId', clientId)

        //     const script = document.createElement('script');
        //     script.type = 'text/javascript';
        //     script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
        //     script.async = true
        //     script.onload = () => {
        //         setSdkReady(true)
        //     }
        //     document.body.appendChild(script)
        // }

        // addPayPalScript()
        if (!order || successPay || successDeliver) {
            dispatch({
                type: ORDER_PAY_RESET
            })
            dispatch({
                type: ORDER_DELIVER_RESET
            })
            dispatch(getOrderDetails(orderId))
        }
        // else if (!order.isPaid) {
        //     if (!window.paypal) {
        //         addPayPalScript()
        //     } else {
        //         setSdkReady(true)
        //     }

        // }
    }, [orderId, dispatch, successPay, order, successDeliver])

    const successPaymentHandler = () => {
        dispatch(payOrder(orderId))
        dispatch(getOrderDetails(orderId))
    }
    const successDeliverHandler = () => {
        dispatch(deliverOrder(orderId))
        dispatch(getOrderDetails(orderId))
    }


    return (
        <>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : <>
                <h1>Order {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p><strong>Name: </strong> {order.user.name}</p>
                                {/* <a href={`mailto:${order.user.email`}></a> */}
                                <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                                <p>
                                    <strong>Address : </strong>
                                    {order.shippingAddress.address},{order.shippingAddress.city}{' '}
                                    {order.shippingAddress.postalCode},{' '}
                                    {order.shippingAddress.country}
                                </p>
                                <p>{order.isDelivered ? <Message variant='success'>Order Delivered at {order.deliveredAt}</Message> : <Message variant='danger'>Not Delivered</Message>}</p>
                            </ListGroup.Item>


                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                                <p>{order.isPaid ? <Message variant='success'>Paid at {order.paidAt}</Message> : <Message variant='danger'>Not Paid</Message>}</p>
                            </ListGroup.Item>


                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {order.orderItems.length === 0 ? <Message>Order is empty</Message> : (
                                    <ListGroup variant="flush">
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name}
                                                            fluid rounded
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                    </Col>
                                                </Row>

                                            </ListGroup.Item>
                                        ))}

                                    </ListGroup>
                                )}
                            </ListGroup.Item>

                        </ListGroup>
                    </Col>

                    <Col md={4}>
                        <ListGroup>
                            <ListGroup.Item>
                                <h3>Order Summary</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Item</Col>
                                    <Col>$ {order.itemsPrice.toFixed(2)}</Col>
                                </Row>

                            </ListGroup.Item>
                            <ListGroup.Item> <Row>
                                <Col>Shipping</Col>
                                <Col>$ {order.shippingPrice.toFixed(2)}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>$ {order.taxPrice.toFixed(2)}</Col>
                                </Row></ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>$ {order.totalPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {/* 
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? <Loader /> : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )} */}

                                    <Button className="btn btn-block" onClick={successPaymentHandler}>Pay Now</Button>
                                </ListGroup.Item>
                            )}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    {/* 
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? <Loader /> : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )} */}

                                    <Button className="btn btn-block" onClick={successDeliverHandler}>Mark as Delivered </Button>
                                </ListGroup.Item>
                            )}

                        </ListGroup>
                    </Col>

                </Row>

            </>}
        </>
    );
}

export default OrderScreen;