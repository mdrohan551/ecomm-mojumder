// App.js 
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// 👈 এটি যুক্ত করুন
import { Toaster } from 'react-hot-toast'; 

import HomePage from './page/HomePage';
import MasterLayout from './Layout/MasterLayout';
import Details from './components/Details/Details';
import AdminDashboard from './admin/Admin';
import ProtectedRoute from './ProtectedRoute';


const App = () => {
  return (
    <BrowserRouter>
      {/* 👈 Toaster কম্পোনেন্টটি এখানে যুক্ত করুন */}
      <Toaster position="top-right" /> 

      <Routes>
        <Route path='/' element={<MasterLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/details/:id' element={<Details />} />
          <Route 
            path='/admin-333' 
            element={
              <ProtectedRoute>
                <AdminDashboard /> 
              </ProtectedRoute>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;