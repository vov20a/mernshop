import { Col } from 'react-bootstrap'
import { IProduct } from '../types/IProduct'
import { Link, useNavigate } from 'react-router-dom';
import { useActions } from '../hooks/actions';
// import { useAppDispatch } from '../app/store';
// import { addProduct } from '../features/cart/cartSlice';

interface ProductProps {
    product: IProduct | undefined;
    md: number
}

const Product = ({ product, md }: ProductProps) => {
    const { addProduct } = useActions()
    // const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const addCartClick = () => {
        // dispatch(addProduct({ ...product } as unknown as IProduct))
        addProduct({ ...product } as unknown as IProduct)
        navigate(`/cart`);
    }
    return (
        <Col lg={md}>

            <div className="content_box">
                <Link to={`/products/${product?.id}`}>
                    <div className="left-grid-view grid-view-left">
                        <img src={`${process.env.REACT_APP_API_URL}/uploads/${product?.productImg}`} className="img-responsive watch-right" alt="" />
                        <div className="mask">
                            <div className="info">Quick View</div>
                        </div>
                    </div>
                </Link>
                <div>
                    <h4 className='title'> {product?.title}</h4>
                    <p className='description'>{product?.description}</p>
                    <span>Rs.{product?.rating} </span>
                    <span> ${product?.price}</span>
                </div>
            </div>


            <div className="cart-b">
                <div className="left-n ">${`${product?.price}`}</div>
                <div className="now-get get-cart-in" onClick={addCartClick}>ADD TO CART</div>
            </div>
        </Col>
    )
}

export default Product