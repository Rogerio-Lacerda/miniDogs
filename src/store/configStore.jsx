import { configureStore, combineReducers } from '@reduxjs/toolkit';
import login from './login';

const reducer = combineReducers({ login });
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;
