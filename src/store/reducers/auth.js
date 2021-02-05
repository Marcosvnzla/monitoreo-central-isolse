import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  refreshToken: null,
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
        refreshToken: action.refreshToken,
        isLoggedIn: true,
        loading: false
      }

    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        loading: false
      }

    case actionTypes.LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        isLoggedIn: false
      }

    case actionTypes.TOKEN_REFRESH:
      return {
        ...state,
        token: action.newToken
      }

    default:
      return state;
  }
}

export default reducer;