import Axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { listAllOrders } from "../actions/orderActions";
import Loader from "../components/loader";
import Message from "../components/message";

const AllOrderScreen = ({ history }) => {

    const dispatch = useDispatch();

    const orderAll = useSelector(state => state.orderAll);
    const { error, loading, orders: allOrders } = orderAll
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listAllOrders())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])
    return (<>
        <h1>Orders</h1>
        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
            <Table responsive striped >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                    </tr>
                </thead>

                <tbody>
                    {allOrders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user.name}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>${order.totalPrice.toFixed(2)}</td>
                            <td>{order.isPaid ? <i className="fas fa-check" style={{ color: "green" }}></i> : <i className="fas fa-times" style={{ color: "red" }}></i>}</td>
                            <td>{order.isDelivered ? <i className="fas fa-check" style={{ color: "green" }}></i> : <i className="fas fa-times" style={{ color: "red" }}></i>}</td>
                            <td><LinkContainer to={`/order/${order._id}`}>
                                <Button className="btn-sm">Details</Button>
                            </LinkContainer></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </>);
}

export default AllOrderScreen;