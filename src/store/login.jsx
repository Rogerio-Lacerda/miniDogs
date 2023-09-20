import { combineReducers } from '@reduxjs/toolkit';
import createAsyncSlice from './helper/createAsyncSlice';
import getLocalStorage from './helper/getLocalStorage';
getLocalStorage();

const token = createAsyncSlice({
  name: 'token',
  initialState: {
    data: getLocalStorage('token', null),
  },
  fetchConfig: (token) => ({
    url: 'https://dogsapi.origamid.dev/json/jwt-auth/v1/token',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(token),
    },
  }),
});

const user = createAsyncSlice({
  name: 'user',
  fetchConfig: (user) => ({
    url: 'https://dogsapi.origamid.dev/json/api/user',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + user,
      },
    },
  }),
});

const fetchToken = token.asyncFetch;
const fetchUser = user.asyncFetch;

const reducers = combineReducers({
  token: token.reducer,
  user: user.reducer,
});

export const login = (body) => async (dispatch) => {
  try {
    const { payload } = await dispatch(fetchToken(body));
    if (payload.token !== undefined) {
      window.localStorage.setItem('token', JSON.stringify(payload.token));
      const payloadUser = await dispatch(fetchUser(payload.token));
      return payloadUser;
    }
  } catch {
    console.log('Erro');
  }
};

export const autoLogin = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const { data } = state.login.token;
    if (data !== null) {
      const payload = await dispatch(fetchUser(data));
      return payload;
    }
  } catch {
    console.log('Erro');
  }
};

export default reducers;
