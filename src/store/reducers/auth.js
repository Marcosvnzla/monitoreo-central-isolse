import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  isLoggedIn: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        token: action.token
      }
  
    default:
      return state;
  }
}

export default reducer;