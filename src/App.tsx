
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './features/auth/Login'
import Prefetch from './features/auth/Prefetch';
import DashLayout from './components/DashLayout';
import UsersList from './features/users/UsersList';
import Welcome from './features/auth/Welcome';
import PersistLogin from './features/auth/PersistLogin';
import { ROLES } from './config/roles';
import RequireAuth from './features/auth/RequireAuth';
import NewUserForm from './features/users/NewUserForm';
import EditUser from './features/users/EditUser';
import ProductsPage from './pages/ProductsPage';
import ProductsList from './features/products/ProductsList';
import NewProductForm from './features/products/NewProduct';
import EditProduct from './features/products/EditProduct';
import MainPage from './pages/MainPage';
import PageNotFound from './pages/PageNotFound';
import CategoriesList from './features/categories/CategoriesList';
import NewCategory from './features/categories/NewCategory';
import EditCategory from './features/categories/EditCategory';
import SingleProductPage from './pages/SingleProductPage';
import CartPage from './pages/CartPage';
import ProductListOfCategory from './features/products/ProductListOfCategory';
import OrdersList from './features/orders/OrdersList';
import EditOrder from './features/orders/EditOrder';
import NewOrder from './features/orders/NewOrder';
import Register from './features/auth/Register';
import ForgotPwd from './pages/ForgotPwd';
import CreatePassword from './pages/CreatePassword';
import AccountPage from './pages/AccountPage';
import SearchPage from './pages/SearchPage';
import SearchProducts from './features/products/SearchProducts';



function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path='/' element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot" element={<ForgotPwd />} />
        <Route path="create" element={<CreatePassword />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>{/* private routes */}

              <Route path='home' element={<Home />} />
              <Route path='categories/:categoryId' element={<ProductsPage />} />
              <Route path='products/:productId' element={<SingleProductPage />} />
              <Route path='cart' element={<CartPage />} />
              <Route path='account' element={<AccountPage />} />
              <Route path='search' element={<SearchPage />} />

              <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                <Route path="dash" element={<DashLayout />}>
                  <Route index element={<Welcome />} />

                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path="new" element={<NewUserForm />} />
                    <Route path=':id' element={<EditUser />} />
                  </Route>

                  <Route path="products">
                    <Route index element={<ProductsList />} />
                    <Route path="new" element={<NewProductForm />} />
                    <Route path="search" element={<SearchProducts />} />
                    <Route path=':id' element={<EditProduct />} />
                    <Route path='cat/:categoryId' element={<ProductListOfCategory />} />
                  </Route>

                  <Route path="categories">
                    <Route index element={<CategoriesList />} />
                    <Route path="new" element={<NewCategory />} />
                    <Route path=':id' element={<EditCategory />} />
                  </Route>

                  <Route path="orders">
                    <Route index element={<OrdersList />} />
                    <Route path="new" element={<NewOrder />} />
                    <Route path=':id' element={<EditOrder />} />
                  </Route>
                </Route>

              </Route>
            </Route>
          </Route>
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Route>
    </Routes >
  );
}

export default App;
