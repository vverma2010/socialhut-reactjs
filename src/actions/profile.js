import {
  FETCH_USER_PROFILE,
  USER_PROFILE_FAILURE,
  USER_PROFILE_SUCCESS,
} from './actionTypes';
import { APIurls } from '../helpers/url';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';

export function startFetchUserProfile() {
  return {
    type: FETCH_USER_PROFILE,
  };
}

export function userProfileSuccess(user) {
  return {
    type: USER_PROFILE_SUCCESS,
    user: user,
  };
}

export function userProfileFailure(error) {
  return {
    type: USER_PROFILE_FAILURE,
    error: error,
  };
}

export function fetchUserProfile(userId) {
  return (dispatch) => {
    dispatch(startFetchUserProfile());

    const url = APIurls.userProfile(userId);

    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // if (data.success) {
          dispatch(userProfileSuccess(data.data.user));

        //   if (data.data.token) {
        //     localStorage.setItem('token', data.data.token);
        //   }
        // } else {
        //   dispatch(userProfileFailure(data.message));
        // }
      });
  };
}
