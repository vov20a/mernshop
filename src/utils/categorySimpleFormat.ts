
import { ICategory } from '../types/ICategory';

export const categorySimpleFormat = (categories: ICategory[]) => {
    const parentCategories = categories.filter((category) => category?.parentCategory === null);
    const childCategories = categories.filter((category) => category?.parentCategory !== null);
    // console.log(childCategories)

    const arrayAll = [] as ICategory[][];
    //делаем из каждого елемента массива вложенный массив
    parentCategories.forEach((value, index) => {
        arrayAll.push([value]);
    });

    // const parentCategories = Object.values(entities)

    // console.log("first", arrayAllIds)
    //к каждому 0 елементу влдоженного массива- родителю,добавляем детей
    for (let i = 0; i < arrayAll.length; ++i) {
        for (let j = 0; j < 1; ++j) {
            for (let k = 0; k < childCategories.length; ++k) {
                if (arrayAll[i][j]?.id === childCategories[k]?.parentCategory?._id) {
                    arrayAll[i].push(childCategories[k])
                }
            }
        }
    }
    return arrayAll;
}
// create [[parentId,firstChildId,secondChildId,....],[parentId,firstChildId,secondChildId,....],[parentId,firstChildId,secondChildId,....],...]