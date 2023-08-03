import { useParams } from 'react-router-dom';
import EditCategoryForm from './EditCategoryForm';
import { useGetCategoriesQuery } from './categoriesApiSlice';
import useAuth from '../../hooks/useAuth';
import PulseLoader from 'react-spinners/PulseLoader';
import useTitle from '../../hooks/useTitle';
import { ICategory } from '../../types/ICategory';
import { EntityState } from '@reduxjs/toolkit';


const EditCategory = () => {
  useTitle(' Edit Category');

  const { id } = useParams();

  const { isManager, isAdmin } = useAuth();

  const { categories, } = useGetCategoriesQuery('categoriesList', {
    selectFromResult: ({ data, }) => ({
      categories: data?.ids.map((id) => data?.entities[id]) as ICategory[],
    }),
  });

  if (!categories) return <PulseLoader color={'#000'} className='pulse-loader' />;

  const category = categories.find((category) => category.id === id)
  if (!category) return <PulseLoader color={'#000'} className='pulse-loader' />;
  // console.log(category)
  if (!isManager && !isAdmin) {
    return <p className="errmsg">No access</p>;
  }
  // console.log('category', category, 'categories', categories)
  const content = <EditCategoryForm categories={categories} category={category} />;

  return <>{content}</>;

};
export default EditCategory;
