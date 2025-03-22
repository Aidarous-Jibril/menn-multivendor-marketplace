// // redux/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import { createWrapper } from 'next-redux-wrapper';
// import productReducer from './slices/productSlice';
// import userReducer from './slices/userSlice';
// import cartReducer from './slices/cartSlice';
// import wishListReducer from './slices/wishListSlice';


// const makeStore = () => configureStore({
//   reducer: {
//     products: productReducer,
//     user: userReducer,
//     cart: cartReducer,
//     wishList: wishListReducer,
    
//   },
// });

// export const wrapper = createWrapper(makeStore);




// // redux/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import productReducer from './slices/productSlice';
// import userReducer from './slices/userSlice';
// import cartReducer from './slices/cartSlice';
// import wishListReducer from './slices/wishListSlice';
// import orderReducer from './slices/orderSlice';
// import vendorReducer from './slices/vendorSlice';
// import eventReducer from './slices/eventSlice';
// import categoryReducer from './slices/categorySlice';

// export const store = configureStore({
//   reducer: {
//     products: productReducer,
//     user: userReducer,
//     vendor: vendorReducer,
//     cart: cartReducer,
//     wishList: wishListReducer,
//     orders: orderReducer,
//     events: eventReducer,    
//     categories: categoryReducer,

 

//   },
// });

// export default store;



import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import userReducer from './slices/userSlice';
import vendorReducer from './slices/vendorSlice';
import adminReducer from "./slices/adminSlice";
import cartReducer from './slices/cartSlice';
import wishListReducer from './slices/wishListSlice';
import orderReducer from './slices/orderSlice';
import eventReducer from './slices/eventSlice';
import categoryReducer from './slices/categorySlice';
import brandReducer from './slices/brandSlice';
import couponReducer from './slices/couponSlice';
import checkoutReducer from './slices/checkoutSlice';
import { createWrapper } from 'next-redux-wrapper';

export function makeStore(preloadedState) {
  return configureStore({
    reducer: {
      products: productReducer,
      user: userReducer,
      vendors: vendorReducer,
      admin: adminReducer,
      cart: cartReducer,
      wishList: wishListReducer,
      orders: orderReducer,
      events: eventReducer,
      categories: categoryReducer,
      brands: brandReducer, 
      coupons: couponReducer, 
      checkout: checkoutReducer,
    },
    preloadedState, // For server-side rendering
  });
}

export const wrapper = createWrapper(makeStore, { debug: false });

