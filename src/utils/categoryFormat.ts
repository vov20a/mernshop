import { EntityId, Dictionary } from '@reduxjs/toolkit';
import { ICategory } from '../types/ICategory';

export const categoryFormat = (ids: EntityId[], entities: Dictionary<ICategory>): EntityId[][] => {
    const parentCategoryIds = ids.filter((categoriesId) => entities[categoriesId]?.parentCategory === null);
    const childCategoryIds = ids.filter((categoriesId) => entities[categoriesId]?.parentCategory !== null);
    // console.log(childCategoryIds[0])

    const arrayAllIds = [] as EntityId[][];
    //делаем из каждого елемента массива вложенный массив
    parentCategoryIds.forEach((value, index) => {
        arrayAllIds.push(parentCategoryIds.slice(index, index + 1));
    });

    // const parentCategories = Object.values(entities)

    // console.log("first", arrayAllIds)
    //к каждому 0 елементу влдоженного массива- родителю,добавляем детей
    for (let i = 0; i < arrayAllIds.length; ++i) {
        for (let j = 0; j < 1; ++j) {
            for (let k = 0; k < childCategoryIds.length; ++k) {
                if (entities[arrayAllIds[i][j]]?.id === entities[childCategoryIds[k]]?.parentCategory?._id) {
                    arrayAllIds[i].push(childCategoryIds[k])
                }
            }
        }
    }
    return arrayAllIds;
}
// create [[parentId,firstChildId,secondChildId,....],[parentId,firstChildId,secondChildId,....],[parentId,firstChildId,secondChildId,....],...]