import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import Category from '../components/Category';
import { IProductsCount, useGetCountQuery, useGetProductsQuery } from '../features/products/productsApiSlice'
import { IProduct } from '../types/IProduct';
import { EntityId, EntityState } from '@reduxjs/toolkit';
import { PulseLoader } from 'react-spinners';
import Product from '../components/Product';
// import { useGetCategoriesQuery } from '../features/categories/categoriesApiSlice';
// import { ICategory } from '../types/ICategory';
import { pagesCount } from '../utils/pagesCount';
import PaginationElement from '../components/PaginationElement';


const SearchPage = () => {

    const { state } = useLocation()
    const [search, setSearch] = useState(state)

    const { data: countResult } = useGetCountQuery(`?query=${search}`, {})
    // const { data: categories } = useGetCategoriesQuery('categoriesList', {})
    // console.log(count)

    const [limit] = React.useState(3)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [query, setQuery] = React.useState('')

    const location = useLocation()
    location.search = `page=${currentPage}&search=${search}`
    window.history.pushState(null, '', location.pathname + '/?' + location.search);

    React.useEffect(() => {
        setSearch(state)
        setCurrentPage(1)
    }, [state])

    React.useEffect(() => {
        const startProduct = currentPage * limit - limit;
        setQuery(`?startProduct=${startProduct}&limit=${limit}&search=${search}`)
    }, [currentPage, limit, search])

    // console.log(query)
    const {
        productsObject,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetProductsQuery(query, {
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
    // let category: ICategory | undefined;
    // let parentCategory: ICategory | undefined;

    if (isLoading) content = <PulseLoader color={'#000'} className="pulse-loader" />;

    if (isError) {
        // category = categories?.entities[categoryId as unknown as EntityId] as ICategory;
        // parentCategory = categories?.entities[category?.parentCategory?._id as unknown as EntityId] as ICategory
        content = <p className="errmsg">{error?.data?.message}</p>;
    }

    if (isSuccess) {
        const { ids, entities } = productsObject as EntityState<IProduct>;
        // console.log(ids, entities)

        content = ids?.length && ids.map((id: EntityId) =>
            <Product md={4} key={id} product={entities[id]} />
        );
        // category = entities[ids[0]]?.category ?? undefined;
        // parentCategory = categories?.entities[category?.parentCategory as unknown as EntityId] as ICategory;
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
                                            <h3>Search for "{search}"</h3>
                                        </Col>
                                        <Col md={6}>
                                            {/* <ul className="w_nav">
                                                <li>Sort : </li>
                                               <li><a className="active">popular</a></li> |
                                                <li><a >new </a></li> |
                                                <li><a >discount</a></li> |
                                                <li><a >price: Low High </a></li> 
                                            </ul>*/}
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

export default SearchPage