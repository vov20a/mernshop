import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IProductsCount, useGetCountQuery, useGetProductsQuery } from './productsApiSlice'
import { PulseLoader } from 'react-spinners'
import { pagesCount } from '../../utils/pagesCount'
import { Button, Col, Row } from 'react-bootstrap'
import { EntityId } from '@reduxjs/toolkit'
import Product from './Product'
import PaginationElement from '../../components/PaginationElement'
import { useDebounce } from '../../hooks/debounce'

const SearchProducts = () => {
    const navigate = useNavigate()

    const { state } = useLocation()
    const [search, setSearch] = useState(state)
    // const debounced = useDebounce(search)
    // useEffect(() => {
    //     if (debounced.length > 2) {
    //         navigate('/dash/products/search', { state: debounced })
    //         setSearch('')
    //     }
    // }, [debounced])

    const [limit] = React.useState(5)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [query, setQuery] = React.useState('')

    const location = useLocation()
    location.search = `page=${currentPage}`
    window.history.pushState(null, '', location.pathname + '?' + location.search);

    const { data: countResult } = useGetCountQuery(`?query=${search}`, {})

    React.useEffect(() => {
        setSearch(state)
        setCurrentPage(1)
    }, [state])

    React.useEffect(() => {
        const startProduct = currentPage * limit - limit;
        setQuery(`?startProduct=${startProduct}&limit=${limit}&search=${search}`)
    }, [currentPage, limit, search])

    const {
        // data: products,
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

    if (isLoading) content = <PulseLoader color={'#000'} className='pulse-loader' />;

    if (isError) {

        content = <p className="errmsg">{error?.data?.message}</p>;
    }

    if (isSuccess) {
        // console.log(count)
        const { ids } = productsObject;

        const tableContent = ids?.length && ids.map((productId: EntityId) => <Product key={productId} productId={productId} />);

        content = (
            <>
                <Row >
                    <Col md={9} className='mt-3' >
                        <h3>Products Of Search:"{search}"</h3>
                    </Col>
                    <Col md={3} className='mt-3'>
                        <Button><Link to="/dash/products">Back</Link></Button>
                        {/* <div className="search">
                            <input
                                type="text"
                                className="search"
                                placeholder="Search products..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>*/}
                    </Col>

                </Row>
                <table className="table table__products">
                    <thead className="table__thead">
                        <tr>
                            <th scope="col" className="table__th">
                                Title
                            </th>
                            <th scope="col" className="table__th">
                                Image
                            </th>
                            <th scope="col" className="table__th">
                                Description
                            </th>
                            <th scope="col" className="table__th">
                                Price
                            </th>
                            <th scope="col" className="table__th">
                                Rating
                            </th>
                            <th scope="col" className="table__th">
                                Category
                            </th>
                            <th scope="col" className="table__th">
                                CreatedAt
                            </th>
                            <th scope="col" className="table__th">
                                UpdatedAt
                            </th>
                            <th scope="col" className="table__th">
                                Edit
                            </th>
                        </tr>
                    </thead>
                    <tbody>{tableContent}</tbody>
                </table>
                <Row className="justify-content-md-center mt-5">
                    <Col md={12} >
                        <nav aria-label="Page navigation">
                            {pageCount > 1 && (
                                <PaginationElement limit={limit} currentPage={currentPage} onChangePage={(page) => setCurrentPage(page)} pageCount={pageCount} />
                            )}
                        </nav>
                    </Col>
                </Row>
            </>
        );
    }

    return <>{content}</>;
}

export default SearchProducts