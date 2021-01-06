import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Button, Col, Form, Row } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userAction';
import Loader from '../components/loader';
import Message from '../components/message';
const RegsterScreen = ({ location, history }) => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister);
    const { userInfo, loading, error } = userRegister;
    const redirect = location.search ? location.search.split('=')[1] : '/'

    console.log('redirect', redirect)

    console.log('userInfo', userInfo)


    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, redirect, userInfo])
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passsword Doesn't Match")
        } else {
            dispatch(register(name, email, password))
        }
    }
    return (
        <FormContainer>
            <h1>Sing Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
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
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            console.log(e.target.value)
                            setEmail(e.target.value)
                        }}
                    ></Form.Control>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password"
                        placeholder="Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type="submit">Register</Button>
                <Row className="py-3">
                    <Col>
                        Have an account?
                    < Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Login</Link>
                    </Col>
                </Row>

            </Form>
        </FormContainer>
    );
}

export default RegsterScreen;