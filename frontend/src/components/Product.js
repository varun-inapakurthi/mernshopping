import { Card } from "react-bootstrap"
import { Link } from "react-router-dom";
import Rating from "./Rating";
// import products from "../products"

const Product = ({ product }) => {
    return (

        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} />
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div" >
                        <strong> {product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <Rating value={product.rating}
                        text={`${product.numReviews} reviews`}
                    />
                    {/* {product.description} */}
                </Card.Text>
                <Card.Text as="h3">
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>

    );
}

export default Product;