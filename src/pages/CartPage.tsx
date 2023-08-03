
// import {/* addProduct, minusProduct, removeProduct, removeProductAll,*/ selectAllCart, selectTotalPrice } from '../features/cart/cartSlice'
import { IProduct } from '../types/IProduct'
// import { useAppDispatch } from '../app/store'
import OrderForm from '../components/OrderForm'
import useAuth from '../hooks/useAuth'
// import { IProductInfo } from '../types/IOrder'
// import { useSelector } from 'react-redux'
import { useActions } from '../hooks/actions'
import { Col, Container, Row } from 'react-bootstrap'
import Category from '../components/Category'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'


const CartPage = () => {
    // const dispatch = useAppDispatch();
    const { addProduct, minusProduct, removeProduct, removeProductAll } = useActions()

    const { username, email, id } = useAuth()
    const { ids, entities, totalPrice } = useAppSelector(state => state.cart)
    const products = ids.map((id) => {
        return entities[id] as unknown as IProduct
    })

    //можно применить  useSelector(selectAllCart) или(и)  useAppSelector(state => state.cart)

    // const cart = useSelector(selectAllCart) as unknown as IProduct[]
    // const totalPrice = useSelector(selectTotalPrice)


    const onClickRemove = (product: IProduct) => {
        if (product.id) {
            // dispatch(removeProduct(product.id))
            removeProduct(product.id)
        }
    }
    const onPlusProduct = (product: IProduct) => {
        if (product) {
            // dispatch(addProduct(product))
            addProduct(product)
        }
    }
    const onMinusProduct = (product: IProduct) => {
        if (product) {
            // dispatch(minusProduct(product))
            minusProduct(product)
        }
    }
    const onClickRemoveAll = () => {
        // dispatch(removeProductAll())
        removeProductAll()
    }


    return (
        <Container>
            <Row>
                <Col md={4}>
                    <Category />
                </Col>
                {products.length ?
                    <Col md={8}>
                        <h4 className="title">
                            <span className="pull-left "><span className="text">Your</span><span
                                className="line"><strong>cart</strong></span></span>
                        </h4>
                        <div className="table-responsive ">
                            <table className="table__cart  table-striped checkout-table">
                                <thead style={{ borderBottom: "1px solid #000 " }}>
                                    <tr>
                                        <th style={{ textAlign: "center" }}>Remove</th>
                                        <th style={{ textAlign: "center" }}>Image</th>
                                        <th style={{ textAlign: "center" }}>Title</th>
                                        <th style={{ textAlign: "center", minWidth: 150 }}>Qty,lb</th>
                                        <th style={{ textAlign: "center" }}>Price,$</th>
                                        <th style={{ textAlign: "center" }}>Total,$</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products?.map((product: IProduct, index) =>
                                        <tr key={index}>
                                            <td style={{ textAlign: "center" }}>
                                                <button style={{ border: "none" }}
                                                    onClick={() => onClickRemove(product)}
                                                    className="button button--outline button--circle">
                                                    <svg width="24px" height="24px" viewBox="0 0 1024 1024" fill="#ff0000" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M512 897.6c-108 0-209.6-42.4-285.6-118.4-76-76-118.4-177.6-118.4-285.6 0-108 42.4-209.6 118.4-285.6 76-76 177.6-118.4 285.6-118.4 108 0 209.6 42.4 285.6 118.4 157.6 157.6 157.6 413.6 0 571.2-76 76-177.6 118.4-285.6 118.4z m0-760c-95.2 0-184.8 36.8-252 104-67.2 67.2-104 156.8-104 252s36.8 184.8 104 252c67.2 67.2 156.8 104 252 104 95.2 0 184.8-36.8 252-104 139.2-139.2 139.2-364.8 0-504-67.2-67.2-156.8-104-252-104z" fill=""></path><path d="M707.872 329.392L348.096 689.16l-31.68-31.68 359.776-359.768z" fill=""></path><path d="M328 340.8l32-31.2 348 348-32 32z" fill=""></path></g></svg>
                                                </button>
                                            </td>
                                            <td style={{ textAlign: "center" }}>
                                                <Link to={`/products/${product.id}`}>
                                                    <img alt="img" src={process.env.REACT_APP_API_URL + '/uploads/' + product.productImg} width={30} />
                                                </Link>
                                            </td>
                                            <td style={{ textAlign: "center" }}> {product.title}</td>
                                            <td style={{ textAlign: "center" }}>
                                                <button style={{ border: "none" }}
                                                    // disabled={product.count === 1}
                                                    onClick={() => onMinusProduct(product)}
                                                    className="button button--outline button--circle cart__item-count-minus">
                                                    <svg width="24px" height="24px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 12H16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                                </button>
                                                {product.count}
                                                <button style={{ border: "none" }}
                                                    onClick={() => onPlusProduct(product)}
                                                    className="button button--outline button--circle cart__item-count-plus">
                                                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 7V17M7 12H17M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                                </button>
                                            </td>
                                            <td style={{ textAlign: "center" }}>
                                                {product.price}
                                            </td>
                                            <td style={{ textAlign: "center" }}>
                                                {product.price * (product?.count ? product?.count : 1)}
                                            </td>
                                        </tr>
                                    )}
                                    <tr>
                                        <td style={{ textAlign: "center" }}>
                                            <button style={{ border: "none" }}
                                                onClick={onClickRemoveAll}
                                                className="button button--outline button--circle">
                                                <svg width="24px" height="24px" viewBox="0 0 1024 1024" fill="#ff0000" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M512 897.6c-108 0-209.6-42.4-285.6-118.4-76-76-118.4-177.6-118.4-285.6 0-108 42.4-209.6 118.4-285.6 76-76 177.6-118.4 285.6-118.4 108 0 209.6 42.4 285.6 118.4 157.6 157.6 157.6 413.6 0 571.2-76 76-177.6 118.4-285.6 118.4z m0-760c-95.2 0-184.8 36.8-252 104-67.2 67.2-104 156.8-104 252s36.8 184.8 104 252c67.2 67.2 156.8 104 252 104 95.2 0 184.8-36.8 252-104 139.2-139.2 139.2-364.8 0-504-67.2-67.2-156.8-104-252-104z" fill=""></path><path d="M707.872 329.392L348.096 689.16l-31.68-31.68 359.776-359.768z" fill=""></path><path d="M328 340.8l32-31.2 348 348-32 32z" fill=""></path></g></svg>
                                            </button>
                                        </td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td style={{ textAlign: "center" }}>Total</td>
                                        <td style={{ textAlign: "center" }}><strong>
                                            {totalPrice}
                                        </strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Col> :
                    <Col md={8}>
                        <h1>Cart is empty</h1>
                    </Col>
                }
            </Row>
            <Row>
                <Col md={{ span: 8, offset: 4 }}>
                    <OrderForm user={{ username, email, id }} /*totalPrice={totalPrice}*/ />
                </Col>
            </Row>

        </Container>
    )
}

export default CartPage