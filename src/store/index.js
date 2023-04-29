import { configureStore } from '@reduxjs/toolkit';

import filters from '../components/heroesFilters/filterSlice';
import { apiSlice } from '../api/apiSlice';

const stringMiddeleware = () => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      tipe: action
    })
  }
  return next(action);
};
    
const store = configureStore({
  reducer: {filters, [apiSlice.reducerPath]: apiSlice.reducer},
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
    stringMiddeleware,
    apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;
