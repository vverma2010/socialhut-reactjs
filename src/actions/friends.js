import { APIurls } from '../helpers/url';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { FETCH_FRIENDS_SUCCESS, ADD_FRIEND } from './actionTypes';

export function fetchUserFriends(userId) {
  return (dispatch) => {
    const url = APIurls.userFriends(userId);

    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        dispatch(fetchFriendsSuccess(data.data.friends));
      });
  };
}

export function fetchFriendsSuccess(friends) {
  return {
    type: FETCH_FRIENDS_SUCCESS,
    friends: friends,
  };
}

export function addFriend(friend) {
  return {
    type: ADD_FRIEND,
    friend: friend,
  };
}
