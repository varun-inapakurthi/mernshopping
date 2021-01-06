import { useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { lisTopProduct } from "../actions/productActions";
import Loader from "./loader";
import Message from "./message";

const ProductCarousel = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated);

    const { loading, error, products } = productTopRated;

    useEffect(() => {
        dispatch(lisTopProduct())
    }, [dispatch])

    return (
        <>

            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <Carousel pause="havor" className="bg-dark">
                    {products.map(product => (

                        <Carousel.Item key={product._id}>
                            <Link to={`/product/${product._id}`}>
                                <Image src={product.image} alt={product.name} fluid />
                                <Carousel.Caption className="carousel-caption">
                                    <h2>
                                        {product.name} ({product.price})
                                    </h2>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>

                    ))}
                </Carousel>
            )}</>
    );
}

export default ProductCarousel;