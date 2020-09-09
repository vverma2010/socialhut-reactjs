import { LOGIN_START, SIGNUP_START } from '../actions/actionTypes';
import { LOGIN_SUCCESS, SIGNUP_SUCCESS } from '../actions/actionTypes';
import { LOGIN_FAILED, SIGNUP_FAILED } from '../actions/actionTypes';
import { AUTHENTICATE_USER } from '../actions/actionTypes';
import { LOGOUT_USER } from '../actions/actionTypes';
const initialAuthState = {
  user: {},
  error: null,
  isLoggedIn: false,
  inProgress: false,
};

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN_START:
    case SIGNUP_START:
      return {
        ...state,
        inProgress: true,
      };
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
        inProgress: false,
        error: null,
      };
    case LOGIN_FAILED:
    case SIGNUP_FAILED:
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };
    case AUTHENTICATE_USER:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: {},
        isLoggedIn: false,
      };
    default:
      return state;
  }
}