// import { NavDropdown } from "react-bootstrap";
// import { FormControl } from "react-bootstrap";
// import { Button } from "react-bootstrap";
// import { Form } from "react-bootstrap";
import { Nav, NavDropdown } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { LinkContainer } from 'react-router-bootstrap'
import { Route } from "react-router-dom";
import { logout } from "../actions/userAction";
import SearchBox from "./SearchBox";

const Header = () => {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logout())
    }

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin
    return (

        <header>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand >Shopping</Navbar.Brand>
                    </LinkContainer>

                    <Route render={({ history }) => <SearchBox history={history} />} />
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link >
                                    <i className="fas fa-shopping-cart"></i>
                                Cart</Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id="username">
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            Profile
                                    </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>

                                </NavDropdown>
                            ) : <LinkContainer to="/login">
                                    <Nav.Link >
                                        <i className="fas fa-user"></i>
                                Sign in</Nav.Link>
                                </LinkContainer>}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id="adminmenu">
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </header >
    );
}

export default Header;