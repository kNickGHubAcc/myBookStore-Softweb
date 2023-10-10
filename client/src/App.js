import React from 'react';
import './App.css';
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import Cart from './components/Cart';
import Home from './components/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import NotFound from './components/NotFound';
import {ToastContainer} from "react-toastify";
import CheckoutSuccess from './components/CheckoutSuccess';
import Dashboard from './components/admin/Dashboard';
import Products from './components/admin/Products';
import Summary from './components/admin/Summary';
import CreateProduct from './components/admin/CreateProduct';
import ProductsList from './components/admin/lists/ProductsList';
import Orders from './components/admin/Orders';
import Users from './components/admin/Users';
import Product from './components/Details/Product';
import UserProfile from './components/Details/UserProfile';
import Order from './components/Details/Order';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer/>
        <NavBar/>
        <div className='content-container'>
          <Routes>
            <Route path='/' exact element={<Home/>}/>       {/*Η αρχική σελίδα*/}
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/checkout-success' element={<CheckoutSuccess/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/product/:id' element={<Product/>}/>
            <Route path='/order/:id' element={<Order/>}/>
            <Route path='/user/:id' element={<UserProfile/>}/>
            <Route path='/admin' element={<Dashboard/>}> 
            {/*-----Nested Routes-----*/}         
              <Route path='summary' element={<Summary/>}/>        {/*/admin/summary*/}
              <Route path='products' element={<Products/>}>       {/*/admin/products*/}
                <Route index element={<ProductsList/>}/>          {/*Όταν βρίσκομαι στο .../admin/products θα εμφανίζεται το ProductsList component*/}
                <Route path='create-product' element={<CreateProduct/>}/>      {/* /admin/products/create-product */}
              </Route>
              <Route path='users' element={<Users/>}/>      {/*/admin/users*/}
              <Route path='orders' element={<Orders/>}/>
            {/*-----------------------*/}
            </Route>
            <Route path='*' element={<NotFound/>}/>         {/*Για οποιοδήποτε άλλο Route πέραν των παραπάνω*/}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}


export default App;