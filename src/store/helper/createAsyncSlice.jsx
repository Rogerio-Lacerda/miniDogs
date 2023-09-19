import { createSlice } from '@reduxjs/toolkit';

/**
 *
 * @param {Object} config
 * @param {Object} config.name
 * @param {Object} config.initialState
 * @param {Object} config.reducers
 * @param {Function} config.fetchConfig
 */

const createAsyncSlice = (config) => {
  const slice = createSlice({
    name: config.name,
    initialState: {
      data: null,
      loading: false,
      error: null,
      ...config.initialState,
    },
    reducers: {
      fetchStarted(state) {
        state.loading = true;
      },
      fetchSuccess(state, action) {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      },
      fetchError(state, action) {
        state.data = null;
        state.loading = false;
        state.error = action.payload;
      },
      ...config.reducers,
    },
  });

  const { fetchStarted, fetchSuccess, fetchError } = slice.actions;

  const asyncSlice = (payload) => async (dispatch) => {
    let response;
    let json;
    try {
      dispatch(fetchStarted());
      const { url, options } = config.fetchConfig(payload);
      response = await fetch(url, options);
      json = await response.json();
      if (response.ok === false) throw new Error(json.message);
      dispatch(fetchSuccess(json));
    } catch (err) {
      if (err.message) {
        dispatch(fetchError(err.message));
      } else {
        dispatch(fetchError('Erro ao fazer requisição'));
      }
    }
  };

  return { ...slice, asyncSlice };
};

export default createAsyncSlice;
