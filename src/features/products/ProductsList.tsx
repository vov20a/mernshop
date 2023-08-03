import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { IProductsCount, useGetCountQuery, useGetProductsQuery } from './productsApiSlice';
import Product from './Product';
import { PulseLoader } from 'react-spinners';
import useTitle from '../../hooks/useTitle';
import { EntityId } from '@reduxjs/toolkit';
import { pagesCount } from '../../utils/pagesCount'
import { Col, Row } from 'react-bootstrap';
import PaginationElement from '../../components/PaginationElement';
import { useDebounce } from '../../hooks/debounce';


const UsersList: React.FC = () => {
    useTitle('Products List');

    const { pathname } = useLocation()
    const navigate = useNavigate();

    const [search, setSearch] = useState('')
    const debounced = useDebounce(search)
    useEffect(() => {
        if (debounced.length > 2) {
            navigate('/dash/products/search', { state: debounced })
            setSearch('')
        }
    }, [debounced])


    const [limit] = React.useState(5)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [sort, setSort] = React.useState('rating')
    const [query, setQuery] = React.useState('')

    const location = useLocation()
    location.search = `page=${currentPage}&sort=${sort}`
    window.history.pushState(null, '', location.pathname + '?' + location.search);

    const clickSort = (sortValue: string) => {
        setSort(sortValue)
    }
    const activeClassRating = sort === 'rating' ? 'active' : ''
    const activeClassPrice = sort === 'price' ? 'active' : ''
    const activeClassTitle = sort === 'title' ? 'active' : ''

    React.useEffect(() => {
        const startProduct = currentPage * limit - limit;
        setQuery(`?sort=${sort}&startProduct=${startProduct}&limit=${limit}`)
    }, [currentPage, limit, sort])

    const { data: countResult } = useGetCountQuery('')
    const {
        // data: products,
        productsObject,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetProductsQuery(query, {
        // } = useGetProductsQuery('productsList', {
        //     pollingInterval: 60000,
        //     refetchOnFocus: true,
        //     refetchOnMountOrArgChange: true,
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
                    <Col md={8} className='mt-3' >
                        <h3>Products of all categories</h3>
                    </Col>
                    <Col md={4} className='mb-2'>
                        <div className="search">
                            <input
                                type="text"
                                className="search"
                                placeholder="Search products..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                    </Col>

                </Row>
                <table className="table table__products">
                    <thead className="table__thead">
                        <tr>
                            <th onClick={() => clickSort('title')} scope="col" className={`table__th th_cursor ${activeClassTitle}`}>
                                Title
                            </th>
                            <th scope="col" className="table__th">
                                Image
                            </th>
                            <th scope="col" className="table__th">
                                Description
                            </th>
                            <th onClick={() => clickSort('price')} scope="col" className={`table__th th_cursor ${activeClassPrice}`}>
                                Price
                            </th>
                            <th onClick={() => clickSort('rating')} scope="col" className={`table__th th_cursor ${activeClassRating}`}>
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
};
export default UsersList;
