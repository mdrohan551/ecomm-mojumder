import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './page/HomePage';
import MasterLayout from './Layout/MasterLayout';

import Details from './components/Details/Details';

import AdminDashboard from './admin/Admin';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MasterLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/details/:id' element={<Details />} />
          <Route path='/admin-333' element={<AdminDashboard />} />

        </Route>
      </Routes>




    </BrowserRouter>
  )
}

export default App