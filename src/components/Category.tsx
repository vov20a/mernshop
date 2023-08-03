import React from 'react'
import { useGetCategoriesQuery } from '../features/categories/categoriesApiSlice';
import { PulseLoader } from 'react-spinners';
import { EntityId, EntityState } from '@reduxjs/toolkit';
import { ICategory } from '../types/ICategory';
import { categoryFormat } from '../utils/categoryFormat';
import CategoryList from './CategoryList';
import { Nav } from 'react-bootstrap';

const Category = () => {
    const {
        data: categories,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetCategoriesQuery('categoriesList', {});
    let content;

    if (isLoading) content = <PulseLoader color={'#000'} className="pulse-loader" />;

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>;
    }

    if (isSuccess) {
        const { ids, entities } = categories as EntityState<ICategory>;
        const arrayAllIds: EntityId[][] = categoryFormat(ids, entities);

        content = ids?.length && arrayAllIds.map((arrayCategoryId: EntityId[], index: number) =>
            <CategoryList key={index} arrayCategoryId={arrayCategoryId} entities={entities} />
        );

    }
    return (
        <div className="sub-cate">
            <div className=" top-nav rsidebar span_1_of_left">
                <h3 className="cate">CATEGORIES</h3>
                <Nav className="flex-column">
                    {content}
                </Nav>
            </div>
        </div>
    )
}

export default Category