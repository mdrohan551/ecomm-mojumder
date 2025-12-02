import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './page/HomePage';
import MasterLayout from './Layout/MasterLayout';
import ShopPage from './page/ShopPage';
import ReviewPage from './components/Review/ReviewPage';
import OrdersPage from './components/Orders/OrderCard';
import Details from './components/Details/Details';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MasterLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/review' element={<ReviewPage />} />
          <Route path='/orders' element={<OrdersPage />} />
          <Route path='/details/:id' element={<Details />} />
     
        </Route>
      </Routes>




    </BrowserRouter>
  )
}

export default App