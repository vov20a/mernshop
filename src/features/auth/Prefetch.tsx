import { store } from '../../app/store';
import { categoriesApiSlice } from '../categories/categoriesApiSlice';
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
// import { productsApiSlice } from '../products/productsApiSlice';

const Prefetch = () => {
    // useEffect(() => {
    //     console.log('subscribing')
    //     const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate())
    //     const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

    //     return () => {
    //         console.log('unsubscribing')
    //         notes.unsubscribe()
    //         users.unsubscribe()
    //     }
    // }, [])

    // return <Outlet />
    useEffect(() => {
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }));
        store.dispatch(categoriesApiSlice.util.prefetch('getCategories', 'categoriesList', { force: true }));
        // store.dispatch(productsApiSlice.util.prefetch('getCount', 'productsList', { force: true }));
        // console.log('persist', localStorage.getItem('persist'))
    }, []);

    return <Outlet />;
};
export default Prefetch;