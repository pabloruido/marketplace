
import { Layout } from './layout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './Login';
import { Register } from './Register';
import { Categories } from './Categories';
import { Category } from './Category';
import { AddCategory } from './AddCategory';
import { UpdateCategoty } from './UpdateCategory';
import { DeleteCategory } from './DeleteCategory';
import { Products } from './Products';
import { Product } from './Product';
import { Cart } from './Cart';
import { NoMatch } from './NoMatch';
import { AddProduct } from './AddProduct';
import { UpdateProduct } from './UpdateProduct';
import { DeleteProduct } from './DeleteProduct';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';
import { AdminRoute } from './AdminRoute';
import { UserRoute } from './UserRoute';
import { Home } from './Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const App = () => (


  <QueryClientProvider client={queryClient}>
    <Router>
      <CartProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:CategoryId/products" element={<Category />} />
              <Route path="/categories/addcategory" element={
                <AdminRoute>
                  <AddCategory />
                </AdminRoute>
              } />
              <Route path="/categories/deletecategory/:CategoryId" element={
                <AdminRoute>
                  <DeleteCategory />
                </AdminRoute>} />
              <Route path="/categories/updatecategory/:CategoryId" element={
                <AdminRoute>
                  <UpdateCategoty />
                </AdminRoute>} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:productId" element={<Product />} />
              <Route path="/products/addproduct" element={
                <AdminRoute>
                  <AddProduct />
                </AdminRoute>} />
              <Route path="/products/updateproduct/:productId" element={
                <AdminRoute>
                  <UpdateProduct />
                </AdminRoute>} />
              <Route path="/products/deleteproduct/:productId" element={
                <AdminRoute>
                  <DeleteProduct />
                </AdminRoute>} />
              <Route path="/cart-detail" element={
                <UserRoute>
                  <Cart />
                </UserRoute>} />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </AuthProvider>
      </CartProvider>
    </Router>
  </QueryClientProvider>

)
