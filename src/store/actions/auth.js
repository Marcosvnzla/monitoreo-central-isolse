import * as actionTypes from './actionTypes';

const authStart = (token) => {
  return {
    type: actionTypes.AUTH_START,
    token: token
  }
}

export const authInit = () => {
  return (dispatch, getState)=> {
    setTimeout(() => {
      dispatch(authStart('hi Im working again :3'));
      console.log(getState());
    }, 2000);
  }
}