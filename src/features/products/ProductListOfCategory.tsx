import React from 'react'
import { useGetProductsByCategoryIdQuery } from './productsApiSlice';
import Product from './Product';
import { PulseLoader } from 'react-spinners';
import useTitle from '../../hooks/useTitle';
import { EntityId } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';
import { IProduct } from '../../types/IProduct';
// import { useGetCategoriesQuery } from '../categories/categoriesApiSlice';

const ProductListOfCategory = () => {
    useTitle('Products List of Category');

    const { categoryId } = useParams();

    // const { data: categories } = useGetCategoriesQuery('categoriesList', {})

    const {
        data: products,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetProductsByCategoryIdQuery({ categoryId, query: '' });

    let content;
    let title;

    if (isLoading) content = <PulseLoader color={'#000'} className='pulse-loader' />;

    if (isError) {

        content = <p className="errmsg">{error?.data?.message}</p>;
    }

    if (isSuccess) {
        const product = products.entities[products.ids[0]] as IProduct;
        title = product.category.title

        const { ids } = products;

        const tableContent = ids?.length && ids.map((productId: EntityId) => <Product key={productId} productId={productId} />);

        content = (
            <>
                <h1>Products of category: {title}</h1>
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
            </>
        );
    }

    return <>{content}</>;
}

export default ProductListOfCategory