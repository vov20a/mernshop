import { useParams } from 'react-router-dom';
import EditOrderForm from './EditOrderForm';
import { useGetOrdersQuery } from './ordersApiSlice';
import { useGetProductsQuery } from '../products/productsApiSlice';
import useAuth from '../../hooks/useAuth';
import PulseLoader from 'react-spinners/PulseLoader';
import useTitle from '../../hooks/useTitle';
import { IProduct } from '../../types/IProduct';
import { IOrder } from '../../types/IOrder';
import { IUser } from '../../types/IUserType';
import { useGetUsersQuery } from '../users/usersApiSlice';

const EditOrder = () => {
    useTitle('Edit Order');

    const { id } = useParams();

    const { isManager, isAdmin } = useAuth();

    const { order } = useGetOrdersQuery('ordersList', {
        selectFromResult: ({ data }) => ({
            order: id ? data?.entities[id] as IOrder : {} as IOrder,
        }),
    });

    const { products } = useGetProductsQuery('productsList', {
        selectFromResult: ({ data }) => ({
            products: data?.ids.map((id) => data?.entities[id]) as IProduct[],
        }),
    });

    const { users } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map((id) => data?.entities[id]) as IUser[],
        }),
    });

    if (!products || !users || !order) return <PulseLoader color={'#000'} className='pulse-loader' />;

    if (!isManager && !isAdmin) {
        return <p className="errmsg">No access</p>;
    }

    const content = <EditOrderForm order={order} products={products} users={users} />;

    return content;
}

export default EditOrder