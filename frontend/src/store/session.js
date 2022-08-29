// import { Redirect } from 'react-router-dom';
// import { csrfFetch } from './csrf';

// // ACTION VARIABLES
// const SET_USER = 'session/setUser';
// const REMOVE_USER = 'session/removeUser';

// // ******** ACTIONS ********
// // SET THE USER
// const setUser = (user) => {
//   return {
//     type: SET_USER,
//     payload: user,
//   };
// };

// // REMOVE THE USER
// const removeUser = () => {
//   return {
//     type: REMOVE_USER,
//   };
// };

// // LOGIN ... route = /login instead of session
// export const login = (user) => async (dispatch) => {
//   const { credential, password } = user;
//   const response = await csrfFetch('/api/login', {
//     method: 'POST',
//     body: JSON.stringify({
//       credential,
//       password,
//     }),
//   });
//   const data = await response.json();
//   dispatch(setUser(data.user));
//   return response;
// };

// // RESTORE USER
// export const restoreUser = () => async (dispatch) => {
//   const response = await csrfFetch('/api/login');
//   const data = await response.json();
//   dispatch(setUser(data.user));
//   return response;
// };

// // SIGNUP ... route = /signup instead of users
// export const signup = (user) => async (dispatch) => {
//   const { username, firstName, lastName, email, password } = user;
//   const response = await csrfFetch('/api/signup', {
//     method: 'POST',
//     body: JSON.stringify({
//       username,
//       firstName,
//       lastName,
//       email,
//       password,
//     }),
//   });
//   const data = await response.json();
//   dispatch(setUser(data.user));
//   return response;
// };

// // LOGOUT
// export const logout = () => async (dispatch) => {
//   const response = await csrfFetch('/api/login', {
//     method: 'DELETE',
//   });
//   dispatch(removeUser());
//   <Redirect to='/' />
//   return response;
// };

// // INITIAL STATE SHOULD BE NULL
// const initialState = { user: null };


// /******** REDUCER ******** */
// // REDUCER FUNCTION
// const sessionReducer = (state = initialState, action) => {
//   let newState = {...state}
//   switch (action.type) {
//     case SET_USER:
//       newState = Object.assign({}, newState);
//       newState.user = action.payload;
//       return newState;
//     case REMOVE_USER:
//       newState = Object.assign({}, newState);
//       newState.user = null;
//       return newState;
//     default:
//       return state;
//   }
// };

// export default sessionReducer;

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

export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user;
  const response = await csrfFetch('/api/users', {
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
  dispatch(setUser(data.user));
  return response;
};

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
  dispatch(setUser(data.user));
  return response;
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch('/api/login');
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/login', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
