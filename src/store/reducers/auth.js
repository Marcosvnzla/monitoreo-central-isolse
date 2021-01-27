import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: true,
  userId: null,
  isLoggedIn: false,
  loading: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true
      }
    
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        loading: false
      }

    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        loading: false
      }
  
    default:
      return state;
  }
}

export default reducer;