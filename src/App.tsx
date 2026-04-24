import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchProducts, fetchStoreContent } from './redux/productsSlice';

import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/admin/AdminDashboard';
import UserStore from './components/user/UserStore';
import ProductDetailPage from './components/user/Productdetailpage';


export default function App() {
  const dispatch = useAppDispatch();
  const { isAdminLoggedIn } = useAppSelector(s => s.auth);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchStoreContent());
  }, [dispatch]);

  return (
    <Routes>
      {/* User Store */}
      <Route path="/" element={<UserStore />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />

      {/* Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Admin Protected Route */}
      <Route
        path="/admin"
        element={
          isAdminLoggedIn ? <AdminDashboard /> : <Navigate to="/login" />
        }
      />

      {/* Optional fallback */}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}