import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = (token) => {
  return {
    type: actionTypes.AUTH_START,
    token: token
  }
}

export const authInit = (email, password) => {
  return dispatch => {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`, authData)
    .then(response => {
      console.log(response);
      dispatch(authStart(response.data.idToken));
    })
    .catch(e => {
      console.log(e);
    })
  }
}