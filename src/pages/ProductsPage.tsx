import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useParams, useLocation } from 'react-router-dom'
import Category from '../components/Category';
import { IProductsCount, useGetCountQuery, useGetProductsByCategoryIdQuery } from '../features/products/productsApiSlice'
import { IProduct } from '../types/IProduct';
import { EntityId, EntityState } from '@reduxjs/toolkit';
import { PulseLoader } from 'react-spinners';
import Product from '../components/Product';
import { useGetCategoriesQuery } from '../features/categories/categoriesApiSlice';
import { ICategory } from '../types/ICategory';
import { pagesCount } from '../utils/pagesCount';
import PaginationElement from '../components/PaginationElement';



const ProductsPage = () => {
    const { categoryId } = useParams();

    const [limit] = React.useState(3)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [sort, setSort] = React.useState('rating')
    const [query, setQuery] = React.useState(`?startProduct=0&limit=${limit}`)
    //при смене категории если сurrentPage=> 1 м.б. ложный запрос=>сurrentPage =1
    React.useMemo(() => {
        setCurrentPage(1)
        setQuery(`?sort=${sort}&startProduct=0&limit=${limit}`)
    }, [categoryId])

    const sortHandler = (sortValue: string) => {
        setSort(sortValue)
    }
    const activeClassRating = sort === 'rating' ? 'active' : ''
    const activeClassPrice = sort === 'price' ? 'active' : ''
    const activeClassTitle = sort === 'title' ? 'active' : ''

    const { data: countResult } = useGetCountQuery(`?categoryId=${categoryId}`, {})
    const { data: categories } = useGetCategoriesQuery('categoriesList', {})
    // console.log(count)


    const location = useLocation()
    location.search = `page=${currentPage}&sort=${sort}`
    window.history.pushState(null, '', location.pathname + '/?' + location.search);

    React.useEffect(() => {
        const startProduct = currentPage * limit - limit;
        setQuery(`?sort=${sort}&startProduct=${startProduct}&limit=${limit}`)
    }, [currentPage, limit, sort])

    const {
        productsObject,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetProductsByCategoryIdQuery({ categoryId, query }, {
        selectFromResult: ({ data, isLoading, isSuccess, isError, error }) => ({
            productsObject: data as IProductsCount,
            isLoading, isSuccess, isError, error
        })
    });


    const [productsCount, setProductsCount] = React.useState(0)
    const [pageCount, setPageCount] = React.useState(0)

    React.useEffect(() => {
        if (countResult?.count) setProductsCount(countResult.count);
    }, [productsObject, countResult?.count])
    React.useEffect(() => {
        setPageCount(pagesCount(productsCount, limit))
    }, [productsCount, limit])

    let content;
    let category: ICategory | undefined;
    let parentCategory: ICategory | undefined;

    if (isLoading) content = <PulseLoader color={'#000'} className="pulse-loader" />;

    if (isError) {
        category = categories?.entities[categoryId as unknown as EntityId] as ICategory;
        parentCategory = categories?.entities[category?.parentCategory?._id as unknown as EntityId] as ICategory
        content = <p className="errmsg">{error?.data?.message}</p>;
    }

    if (isSuccess) {
        const { ids, entities } = productsObject as EntityState<IProduct>;
        // console.log(ids, entities)

        content = ids?.length && ids.map((id: EntityId) =>
            <Product md={4} key={id} product={entities[id]} />
        );
        category = entities[ids[0]]?.category ?? undefined;
        parentCategory = categories?.entities[category?.parentCategory as unknown as EntityId] as ICategory;
    }

    return (
        <Container>
            <Row>
                <Col md={4}>
                    <Category />
                </Col>
                <Col md={8}>
                    {/* <div className="women-product"> */}
                    <Row>
                        <Col md={12}>
                            <div className=" w_content">
                                <div className="women">
                                    <Row>
                                        <Col md={6}>
                                            <h4 className='breadcrumbs'><Link to="/home">Home </Link>/<span>{parentCategory ? parentCategory?.title + '/' + category?.title : category?.title}</span></h4>
                                        </Col>
                                        <Col md={6}>
                                            <ul className="w_nav">
                                                <li>Sort : </li>
                                                <li><a onClick={() => sortHandler('rating')} className={activeClassRating}>rating</a></li> |
                                                <li><a onClick={() => sortHandler('price')} className={activeClassPrice}  > price: Low High </a></li> |
                                                <li><a onClick={() => sortHandler('title')} className={activeClassTitle}  > title</a></li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        {content}
                    </Row>
                    {/* </div> */}
                </Col>
            </Row>
            <Row className="justify-content-md-center mt-5">
                <Col md={12} >
                    <nav aria-label="Page navigation">
                        {pageCount > 1 && (
                            <PaginationElement limit={limit} currentPage={currentPage} onChangePage={(page) => setCurrentPage(page)} pageCount={pageCount} />
                        )}
                    </nav>
                </Col>
            </Row>
        </Container >
    )
}

export default ProductsPage