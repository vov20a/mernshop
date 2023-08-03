import React from 'react'
import { useGetOrdersQuery } from './ordersApiSlice';
import Order from './Order';
import { PulseLoader } from 'react-spinners';
import useTitle from '../../hooks/useTitle';
import { EntityId } from '@reduxjs/toolkit';
import { IOrder } from '../../types/IOrder';

const UsersList: React.FC = () => {
    useTitle('Orders List');

    const {
        data: orders,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetOrdersQuery('ordersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    let content;

    if (isLoading) content = <PulseLoader color={'#000'} className='pulse-loader' />;

    if (isError) {

        content = <p className="errmsg">{error?.data?.message}</p>;
    }

    if (isSuccess) {

        const { ids, entities } = orders;
        // console.log('orders', entities)

        const tableContent = ids?.length && ids.map((orderId: EntityId) => <Order key={orderId} order={entities[orderId] as unknown as IOrder} />);

        content = (
            <>
                <h1>All Orders</h1>
                <table className="table table__orders">
                    <thead className="table__thead">
                        <tr>
                            <th scope="col" className="table__th">
                                Ordered by
                            </th>
                            <th scope="col" className="table__th">
                                Email
                            </th>
                            <th scope="col" className="table__th">
                                Phone
                            </th>
                            <th scope="col" className="table__th">
                                User
                            </th>
                            <th scope="col" className="table__th">
                                Products
                            </th>
                            <th scope="col" className="table__th">
                                CreatedAt
                            </th>
                            <th scope="col" className="table__th">
                                UpdatedAt
                            </th>
                            <th scope="col" className="table__th">
                                Total Price
                            </th>
                            <th scope="col" className="table__th">
                                Edit
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </table>
            </>
        );
    }

    return <>{content}</>;
};
export default UsersList;
