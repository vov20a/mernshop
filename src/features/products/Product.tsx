import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from './productsApiSlice';
import { memo } from 'react';
import { EntityId } from '@reduxjs/toolkit';
import { IProduct } from '../../types/IProduct';

type ProductProps = {
    productId: EntityId;
}

const Product = ({ productId }: ProductProps) => {
    const { product } = useGetProductsQuery('productsList', {
        selectFromResult: ({ data }) => ({
            product: data?.entities[productId] as IProduct,
        }),
    });

    const navigate = useNavigate();

    if (product) {

        const handleEdit = () => navigate(`/dash/products/${productId}`);

        return (
            <tr className="table__row user" >
                <td className={`table__cell`}> {product.title} </td>
                <td className={`table__cell`}><img width='50px' src={process.env.REACT_APP_API_URL + '/uploads/' + product.productImg} /> </td>
                <td className={`table__cell`}> {product.description} </td>
                <td className={`table__cell`}> {product.price} </td>
                <td className={`table__cell`}> {product.rating} </td>
                <td className={`table__cell`}> {product.category.title} </td>
                <td className={`table__cell`}> {new Date(product.createdAt).toLocaleString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                })} </td>
                <td className={`table__cell`}> {new Date(product.updatedAt).toLocaleString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                })} </td>
                <td className={`table__cell`}>
                    <button className="icon-button table__button" onClick={handleEdit} >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr >
        );
    } else return null;

};

const memoizedProduct = memo(Product);

export default memoizedProduct;
