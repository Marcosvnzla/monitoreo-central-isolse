import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  refreshToken: null,
  isLoggedIn: false,
  loading: false,
  errorMessage: '',
  centrales: null,
  currentCentral: '',
  popUpMessages: [],
  locations: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
        errorMessage: ''
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
        loading: false,
        errorMessage: action.errorMessage
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

    case actionTypes.LOAD_CENTRALES:
      return {
        ...state,
        centrales: action.centrales
      }
    
    case actionTypes.SET_CURRENT_CENTRAL:
      return {
        ...state,
        currentCentral: action.clickedCentral
      }

    case actionTypes.POPUP_START:
      return {
        ...state,
        popUpMessages: [action.message]
      }

    case actionTypes.POPUP_END:
      return {
        ...state,
        popUpMessages: []
      }
    
    case actionTypes.SET_LOCATIONS:
      return {
        ...state,
        locations: action.addresses
      }

    default:
      return state;
  }
}

export default reducer;