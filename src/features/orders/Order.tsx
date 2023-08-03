import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useGetOrdersQuery } from './ordersApiSlice';
import { memo } from 'react';
import { EntityId } from '@reduxjs/toolkit';
import { IOrder } from '../../types/IOrder';


type OrderProps = {
    order: IOrder;
}

const Order = ({ order }: OrderProps) => {

    const navigate = useNavigate();

    if (order) {
        // console.log('order', order)
        // console.log('product', products)
        const handleEdit = () => navigate(`/dash/orders/${order.id}`);

        return (
            <tr className="table__row user" >
                <td className={`table__cell`}> {order.fullName} </td>
                <td className={`table__cell`}> {order.email} </td>
                <td className={`table__cell`}> {order.phone} </td>
                <td className={`table__cell`}> {order.user.username} </td>
                <td className={`table__cell`}> {order.productsInfo.map((productInfo, index) =>
                    <span key={index}><Link to={`/dash/products/${productInfo?.product._id}`}>{productInfo.product.title}:{productInfo.count} .lbs</Link>, </span>
                )} </td>
                <td className={`table__cell`}> {new Date(order.createdAt).toLocaleString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                })} </td>
                <td className={`table__cell`}> {new Date(order.updatedAt).toLocaleString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                })} </td>
                <td className={`table__cell`}>{order.totalPrice}</td>
                <td className={`table__cell`}>
                    <button className="icon-button table__button" onClick={handleEdit} >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr >

        );
    } else return null;
}

const memoizedProduct = memo(Order);
export default memoizedProduct