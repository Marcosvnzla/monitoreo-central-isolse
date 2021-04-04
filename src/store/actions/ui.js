import * as actionTypes from './actionTypes';

const popUpStart = (message) => {
  return {
    type: actionTypes.POPUP_START,
    message: message
  }
}

const popUpEnd = () => {
  return {
    type: actionTypes.POPUP_END
  }
}

export const popUpInit = (message) => {
  return (dispatch) => {
    dispatch(popUpStart(message));
    setTimeout(() => {
      dispatch(popUpEnd());
    }, 2000);
  }
}