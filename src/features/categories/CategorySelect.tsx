import { Dictionary, EntityId } from '@reduxjs/toolkit'
import React from 'react'
import { ICategory } from '../../types/ICategory';

interface CategorySelectPrps {
    arrayCategoryId: EntityId[];
    entities: Dictionary<ICategory>
}

const CategorySelect = ({ arrayCategoryId, entities }: CategorySelectPrps) => {

    const options = arrayCategoryId.map((categoryId, index) => {
        //cat without children
        if (arrayCategoryId.length === 1) {
            return <span key={index}>'None'</span>
        }
        //cat with children
        else if (arrayCategoryId.length > 1 && index > 0) {
            return (
                <span key={categoryId} >
                    {entities[categoryId]?.title} ,
                </span>
            );
        } else return null
    });
    return (
        <div>
            <h3>Parent Category : '{entities[arrayCategoryId[0]]?.title}' </h3>
            <span >Children Categories : </span>
            {/* <select id='city-select' multiple size={arrayCategoryId.length === 1 ? 1 : arrayCategoryId.length - 1}> */}
            {options}
            {/* </select> */}
        </div>
    )
}
export default CategorySelect