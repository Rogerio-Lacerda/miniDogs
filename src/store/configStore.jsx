import { configureStore, combineReducers } from '@reduxjs/toolkit';
import login from './login';
import photos from './photos';

const reducer = combineReducers({ login, photos: photos.reducer });
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;
