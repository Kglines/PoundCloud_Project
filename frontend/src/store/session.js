// frontend/src/store/session.js
import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

// Login
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

// Restore user
export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch('/api/login');
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

// SIGNUP 
export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user;
  const response = await csrfFetch('/api/signup', {
    method: 'POST',
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

// Logout a user
export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/login', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState = {...state};
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, newState);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, newState);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
