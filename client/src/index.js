import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import productsReducer, {productsFetch} from './slices/productsSlice';
import {productsApi} from './slices/productsApi';
import cartReducer, {getTotals} from './slices/cartSlice';
import authReducer from './slices/authSlice';
// import loadUser from './slices/authSlice';
import ordersSlice from './slices/ordersSlice';
import usersSlice from './slices/usersSlice';


const store = configureStore({      //Δημιουργία του Redux Store
  reducer: {
    products: productsReducer,
    orders: ordersSlice,
    users: usersSlice,
    cart: cartReducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,    //Reducer για την διαχείριση των βιβλίων μέσω Redux Toolkit Query
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(productsApi.middleware),
});

store.dispatch(productsFetch());
store.dispatch(getTotals());
// store.dispatch(loadUser());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);