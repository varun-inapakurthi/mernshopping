import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Button, Col, Form, Row } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, register, updateUser } from '../actions/userAction';
import Loader from '../components/loader';
import Message from '../components/message';
import { USER_UPDATE_RESET } from '../constants/userConstants';
const UserEditScreen = ({ match, history }) => {

    const userId = match.params.id

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails);
    const { user, loading, error } = userDetails;
    const userUpdate = useSelector(state => state.userUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({
                type: USER_UPDATE_RESET
            })
            history.push('/admin/userlist')
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [user, dispatch, userId, successUpdate, history])


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))

    }

    return (
        <>
            <Link to='/admin/userlist' className="btn btn-light my-3">
                Go Back
        </Link>
            <FormContainer>
                <h1>Edit User</h1>
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
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => {
                                    console.log(e.target.value)
                                    setEmail(e.target.value)
                                }}
                            ></Form.Control>
                            <Form.Check type="checkbox"
                                label="Is Admin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>
                        <Button type="submit">Update</Button>

                    </Form>
                )}

            </FormContainer>
        </ >
    );
}

export default UserEditScreen;