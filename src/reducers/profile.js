import {
  USER_PROFILE_FAILURE,
  USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE,
} from '../actions/actionTypes';

const initialProfileState = {
  user: {},
  error: null,
  success: null,
  inProgress: false,
};

export default function posts(state = initialProfileState, action) {
  switch (action.type) {
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        success: true,
        user: action.user,
        inProgress: false,
      };
    case USER_PROFILE_FAILURE:
      return {
        ...state,
        error: action.error,
        inProgress: false,
      };
    case FETCH_USER_PROFILE:
      return {
        ...state,
        inProgress: true,
      };
    default:
      return state;
  }
}
