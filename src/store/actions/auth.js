import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId
  }
}

const authFail = () => {
  return {
    type: actionTypes.AUTH_FAIL
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.LOGOUT
  }
}

export const authCheckStatus = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem('userId');
      dispatch(authSuccess(token, userId));
    }
  }
}

export const authInit = (email, password) => {
  return dispatch => {
    dispatch(authStart());

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`, authData)
    .then(response => {
      console.log(response);
      const token = response.data.idToken;
      const userId = response.data.localId;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      dispatch(authSuccess(token, userId));
    })
    .catch(e => {
      console.log(`Error message: ${e.response.data.error.message}`);
      dispatch(authFail());
    })
  }
}