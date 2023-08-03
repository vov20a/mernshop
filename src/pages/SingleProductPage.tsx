import { Link, useParams, useNavigate } from 'react-router-dom'
import { useGetProductsQuery } from '../features/products/productsApiSlice';
import { PulseLoader } from 'react-spinners';
import { IProduct } from '../types/IProduct';
// import { Dictionary, EntityId, EntityState } from '@reduxjs/toolkit';
import { Col, Container, Row } from 'react-bootstrap';
import Category from '../components/Category';
// import { useGetCategoriesQuery } from '../features/categories/categoriesApiSlice';
// import { ICategory } from '../types/ICategory';
// import { useDispatch } from 'react-redux';
// import { addProduct } from '../features/cart/cartSlice';
import { useActions } from '../hooks/actions';

const SingleProductPage = () => {
    const { addProduct } = useActions();
    // const dispatch = useDispatch()
    const navigate = useNavigate()
    const { productId } = useParams();

    const { product, isLoading, isSuccess, isError, error } = useGetProductsQuery('productsList', {
        selectFromResult: ({ data, isLoading, isSuccess, isError, error }) => ({
            product: productId ? data?.entities[productId] : undefined,
            isLoading,
            isSuccess, isError, error
        })
    })

    // const { parentCategory } = useGetCategoriesQuery('categoriesList', {
    //     selectFromResult: ({ data }) => ({
    //         // parentCategoryId: category?.parentCategory ? data?.ids.find((id) => id === '648418342d713c1d194e38c1') as EntityId : undefined,
    //         parentCategory: data?.entities[] as unknown as EntityId] as ICategory
    //     })
    // })


    let content;
    if (isLoading) content = <PulseLoader color={'#000'} className='pulse-loader' />;

    if (isError) {

        content = <p className="errmsg">{error?.data?.message}</p>;
    }

    if (isSuccess) {
        // console.log(product)
        const addCartClick = () => {
            addProduct({ ...product } as unknown as IProduct)
            navigate(`/cart`);
        }

        content = <Container>
            <Row>
                <Col md={{ span: 6, offset: 4 }}>
                    <h4 className='breadcrumbs'><Link to="/home">Home </Link>/<Link to={`/categories/${product?.category?._id}`}>{product?.category?.title}</Link>/<span>{`${product?.title}`}</span></h4>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <Category />
                </Col>
                <Col md={8}>
                    <Row className='single-product'>
                        <Col md={4}>
                            <div className="left-grid-view grid-view-left">
                                <img src={`${process.env.REACT_APP_API_URL}/uploads/${product?.productImg}`} className="img-responsive watch-right" alt="" />
                            </div>
                        </Col>
                        <Col md={8}>
                            <h4>{`${product?.title}`}</h4>
                            <div className="cart-b">
                                <div className="left-n ">${`${product?.price}`}</div>
                                <div className="now-get get-cart-in" onClick={addCartClick}>ADD TO CART</div>
                            </div>
                            <p>{`${product?.description}`}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </Container>
    }
    return (
        <>{content}</>
    )
}

export default SingleProductPage