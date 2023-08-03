import { Carousel, Col, Row } from 'react-bootstrap'
import Category from './Category'
import { useGetProductsByCategoryIdQuery } from '../features/products/productsApiSlice'
// import { useAppDispatch } from '../app/store'
import { useNavigate } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'
import { EntityState } from '@reduxjs/toolkit'
import { IProduct } from '../types/IProduct'
import { useActions } from '../hooks/actions'
// import { addProduct } from '../features/cart/cartSlice'

const CarouselElement = () => {
    const { addProduct } = useActions()
    // const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {
        data: prdts,
        isLoading: isLoadingPrdts,
        isSuccess: isSuccessPrdts
    } = useGetProductsByCategoryIdQuery({ categoryId: "6498973325ab960a2af8e361", query: '?startProduct=0&limit=4' })
    let contentPrdts_0;
    let contentPrdts_1;
    let contentPrdts_2;
    let contentPrdts_3;
    let contentProduct_0;
    let contentProduct_1;
    let contentProduct_2;
    let contentProduct_3;
    if (isLoadingPrdts) {
        contentPrdts_0 = <PulseLoader color={'#000'} className="pulse-loader" />;
        contentPrdts_1 = <PulseLoader color={'#000'} className="pulse-loader" />;
        contentPrdts_2 = <PulseLoader color={'#000'} className="pulse-loader" />;
        contentPrdts_3 = <PulseLoader color={'#000'} className="pulse-loader" />;
    }
    if (isSuccessPrdts) {
        const { ids: idsPrdts, entities: entitiesPrdts } = prdts as EntityState<IProduct>;
        contentPrdts_0 = (<img className="d-block w-100" src={`${process.env.REACT_APP_API_URL}/uploads/${entitiesPrdts[idsPrdts[0]]?.productImg}`} alt="First slide" />)
        contentPrdts_1 = (<img className="d-block w-100" src={`${process.env.REACT_APP_API_URL}/uploads/${entitiesPrdts[idsPrdts[1]]?.productImg}`} alt="Second slide" />)
        contentPrdts_2 = (<img className="d-block w-100" src={`${process.env.REACT_APP_API_URL}/uploads/${entitiesPrdts[idsPrdts[2]]?.productImg}`} alt="" width='120px' />)
        contentPrdts_3 = (<img className="d-block w-100" src={`${process.env.REACT_APP_API_URL}/uploads/${entitiesPrdts[idsPrdts[3]]?.productImg}`} alt="" width='120px' />)

        contentProduct_0 = (<span onClick={() => addCartClick({ ...entitiesPrdts[idsPrdts[0]]! })} className="on-get">GET NOW</span>)
        contentProduct_1 = (<span onClick={() => addCartClick({ ...entitiesPrdts[idsPrdts[1]]! })} className="on-get">GET NOW</span>)
        contentProduct_2 = (<span onClick={() => addCartClick({ ...entitiesPrdts[idsPrdts[2]]! })} className="on-get">GET NOW</span>)
        contentProduct_3 = (<span onClick={() => addCartClick({ ...entitiesPrdts[idsPrdts[3]]! })} className="on-get">GET NOW</span>)
    }

    const addCartClick = (product: IProduct) => {
        // dispatch(addProduct({ ...product } as unknown as IProduct))
        addProduct({ ...product } as unknown as IProduct)
        navigate(`/cart`);
    }
    return (
        <>
            <Row>
                <Col md={4}>
                    <Category />
                </Col>
                <Col md={8}>
                    <div className='slide-grid'>
                        <Carousel fade indicators={false}>
                            <Carousel.Item>
                                <Row className="wrap-in">
                                    <Col md={5} className='banner-bag'>
                                        {contentPrdts_0}
                                    </Col>
                                    <Col md={7} className='banner-off'>
                                        <Carousel.Caption>
                                            <h2>FLAT 50% 0FF</h2>
                                            <label>FOR ALL PURCHASE <b>VALUE</b></label>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et </p>
                                            {contentProduct_0}
                                        </Carousel.Caption>
                                    </Col>
                                </Row>
                            </Carousel.Item>
                            <Carousel.Item>
                                <Row>
                                    <Col md={5} className='banner-bag'>
                                        {contentPrdts_1}
                                    </Col>
                                    <Col md={7} className='banner-off'>
                                        <Carousel.Caption>
                                            <h2>FLAT 50% 0FF</h2>
                                            <label>FOR ALL PURCHASE <b>VALUE</b></label>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et </p>
                                            {contentProduct_1}
                                        </Carousel.Caption>
                                    </Col>
                                </Row>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 4, offset: 4 }} className='con-sed'>
                    <div className=" con-sed-grid">
                        <Row>
                            <Col md={7} sm={6}>
                                <div className=" elit-grid">
                                    <h4>consectetur  elit</h4>
                                    <label>FOR ALL PURCHASE VALUE</label>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, </p>
                                    {contentProduct_2}
                                </div>
                            </Col>
                            <Col md={5} sm={6}>
                                {contentPrdts_2}
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col md={4} className='con-sed' >
                    <div className=" con-sed-grid ">
                        <Row>
                            <Col md={7} sm={6}>
                                <div className=" elit-grid">
                                    <h4>consectetur  elit</h4>
                                    <label>FOR ALL PURCHASE VALUE</label>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, </p>
                                    {contentProduct_3}
                                </div>
                            </Col>
                            <Col md={5} sm={6}>
                                {contentPrdts_3}
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default CarouselElement