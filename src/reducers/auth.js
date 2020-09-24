import { LOGIN_START, SIGNUP_START, EDIT_USER_SUCCESSFUL,EDIT_USER_FAILED } from '../actions/actionTypes';
import { LOGIN_SUCCESS, SIGNUP_SUCCESS } from '../actions/actionTypes';
import { LOGIN_FAILED, SIGNUP_FAILED } from '../actions/actionTypes';
import { AUTHENTICATE_USER } from '../actions/actionTypes';
import { LOGOUT_USER, CLEAR_AUTH_STATE } from '../actions/actionTypes';
const initialAuthState = {
  user: {},
  error: null,
  isLoggedIn: false,
  inProgress: false,
};

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case CLEAR_AUTH_STATE:
      return {
        ...state,
        error: null,
      };
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
    case EDIT_USER_SUCCESSFUL:
      return {
        ...state,
        user: action.user,
        error: false,
      };
    case EDIT_USER_FAILED:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
