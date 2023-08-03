import { useParams } from 'react-router-dom';
import EditProductForm from './EditProductForm';
import { useGetProductsQuery } from './productsApiSlice';
import { useGetCategoriesQuery } from '../categories/categoriesApiSlice';
import useAuth from '../../hooks/useAuth';
import PulseLoader from 'react-spinners/PulseLoader';
import useTitle from '../../hooks/useTitle';
import { IProduct } from '../../types/IProduct';
import { ICategory } from '../../types/ICategory';

const EditProduct = () => {
    useTitle('Edit Product');

    const { id } = useParams();

    const { isManager, isAdmin } = useAuth();

    const { product } = useGetProductsQuery('productsList', {
        selectFromResult: ({ data }) => ({
            product: id ? data?.entities[id] as IProduct : {} as IProduct,
        }),
    });

    const { categories } = useGetCategoriesQuery('categoriesList', {
        selectFromResult: ({ data }) => ({
            categories: data?.ids.map((id) => data?.entities[id]) as ICategory[],
        }),
    });

    if (!product || !product.category) return <PulseLoader color={'#000'} className='pulse-loader' />;

    if (!isManager && !isAdmin) {
        return <p className="errmsg">No access</p>;
    }

    const content = <EditProductForm product={product} categories={categories} />;

    return content;
};
export default EditProduct;
