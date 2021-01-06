import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from 'react-bootstrap';

import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import './index.css'
import './bootstrap.min.css'
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import AllOrderScreen from "./screens/AllOrderScreen";
const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route path='/login' component={LoginScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/order/:id?' component={OrderScreen} />
            <Route path='/admin/userlist' component={UserListScreen} />
            <Route path='/admin/productlist' exact component={ProductListScreen} />
            <Route path='/admin/productlist/:pageNumber' exact component={ProductListScreen} />
            <Route path='/admin/user/:id/edit' component={UserEditScreen} />
            <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
            <Route path='/admin/orderlist' component={AllOrderScreen} />
            <Route path='/search/:keyword' exact component={HomeScreen} />
            <Route path='/page/:pageNumber' exact component={HomeScreen} />
            <Route path='/search/:keyword/page/:pageNumber' exact component={HomeScreen} />
            <Route path='/' exact component={HomeScreen} />
            <Route path='*'>
              <h1>404 Not found <Link to='/'>Go back</Link> </h1>
            </Route>
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
