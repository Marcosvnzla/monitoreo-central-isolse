import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

const authSuccess = (token, userId, refreshToken) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
    refreshToken: refreshToken
  }
}

const authFail = (errorMessage) => {
  return {
    type: actionTypes.AUTH_FAIL,
    errorMessage: errorMessage
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('sessionDate');
  return {
    type: actionTypes.LOGOUT
  }
}

const checkAuthTimeout = (tokenExpirationTime, refreshToken) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(initTokenRefresh(refreshToken));
    }, tokenExpirationTime * 1000);
  }
}

const tokenRefresh = (newToken) => {
  return {
    type: actionTypes.TOKEN_REFRESH,
    newToken: newToken
  }
}

const initTokenRefresh = (refreshToken) => {
  return dispatch => {
    const requestPayload = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }

    axios.post(`https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_FIREBASE_API_KEY}`, requestPayload)
    .then(response => {
      console.log(response);
      const newToken = response.data.id_token;
      const expirationDate = new Date(new Date().getTime() + response.data.expires_in * 1000);
      localStorage.setItem('token', newToken);
      localStorage.setItem('expirationDate', expirationDate);
      dispatch(tokenRefresh(newToken));
      dispatch(checkAuthTimeout(response.data.expires_in, refreshToken))
    })
    .catch(error => {
      console.log(error.response.data);
    })
  }
}

export const authCheckStatus = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    const userId = localStorage.getItem('userId');
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (!token || !refreshToken || !expirationDate || !userId) {
      dispatch(logout());
    } else {
      if (expirationDate <= new Date() && !!refreshToken) {
        dispatch(initTokenRefresh(refreshToken))
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout(((expirationDate.getTime() - new Date().getTime()) / 1000), refreshToken));
      }
    }
  }
}

const checkSessionTimeout = (sessionExpirationTime) => {
  console.log(sessionExpirationTime);
  return dispatch => {
    setTimeout(() => {
      console.log('session timed out');
      dispatch(logout());
    }, sessionExpirationTime * 1000);
  }
}

export const checkSessionStatus = () => {
  return dispatch => {
    const sessionExpirationDate = new Date(localStorage.getItem('sessionDate'));
    if (sessionExpirationDate <= new Date() || !sessionExpirationDate) {
      console.log('session timed out');
      dispatch(logout());
    } else {
      if (sessionExpirationDate > new Date()) {
        console.log('session still active');
        const newExpirationTime = (sessionExpirationDate.getTime() - new Date().getTime()) / 1000;
        dispatch(checkSessionTimeout(newExpirationTime));
      }
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
      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
      const refreshToken = response.data.refreshToken;
      const sessionHourDuration = 5;
      const sessionDate = new Date(new Date().getTime() + (sessionHourDuration * 3600 * 1000));
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('sessionDate', sessionDate); 
      dispatch(authSuccess(token, userId, refreshToken));
      dispatch(checkAuthTimeout(response.data.expiresIn, refreshToken));
      dispatch(checkSessionTimeout(sessionDate.getTime() / 1000));
      console.log('session started');
    })
    .catch(e => {
      console.log(`Error message: ${e.response.data.error.message}`);
      dispatch(authFail(e.response.data.error.message));
    })
  }
}