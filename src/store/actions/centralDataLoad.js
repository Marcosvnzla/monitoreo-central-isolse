import * as actionTypes from './actionTypes';
import axios from 'axios';

const loadStart = () => {
  return {
    type: actionTypes.LOAD_START
  }
}

export const loadInit = (token,uid, formData, currentCentral) => {
  return dispatch => {
    dispatch(loadStart());

    axios.put(`${process.env.REACT_APP_FIREBASE_URL}/${uid}/${currentCentral}/Central_Info.json?auth=${token}&uid=${uid}`, formData)
    .then(response => {
      axios.get(`${process.env.REACT_APP_FIREBASE_URL}/${uid}/${currentCentral}/Enable.json?auth=${token}&uid=${uid}`)
      .then(response => {
        console.log('Making sure Enable exists');
        if (response.data === null) {
          console.log('Creating Enable');
          axios.put(`${process.env.REACT_APP_FIREBASE_URL}/${uid}/${currentCentral}/Enable.json?auth=${token}&uid=${uid}`, "1");
          console.log('Enable created');
        } else {
          console.log('Enable already exists');
          return;
        }
      })
    })
    .catch(e => {
      console.log(e.response.data);
    })
  }
}