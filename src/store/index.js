import { configureStore } from '@reduxjs/toolkit';

import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/filterSlice';

const stringMiddeleware = () => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      tipe: action
    })
  }
  return next(action);
};
    
const store = configureStore({
  reducer: {heroes, filters},
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddeleware),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;
