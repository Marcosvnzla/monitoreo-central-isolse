import * as actionTypes from './actionTypes';
import axios from 'axios';

const loadCentrales = (centrales) => {
  return {
    type: actionTypes.LOAD_CENTRALES,
    centrales: centrales
  }
}

export const setCurrentCentral = (clickedCentral) => {
  localStorage.setItem('lastSelectedCentral', clickedCentral);
  return {
    type: actionTypes.SET_CURRENT_CENTRAL,
    clickedCentral: clickedCentral
  }
}

export const getCentrales = (uid, token) => {
  return dispatch => {
    axios.get(`${process.env.REACT_APP_FIREBASE_URL}/${uid}.json?auth=${token}&uid=${uid}`)
    .then(response => {
      const centrales = Object.keys(response.data);
      const lastSelectedCentral = localStorage.getItem('lastSelectedCentral');
      dispatch(loadCentrales(centrales));
      if (!lastSelectedCentral) {
        return;
      }
      dispatch(setCurrentCentral(lastSelectedCentral));
    })
    .catch(error => {
      console.log(error.response.data);
    })
  }
}