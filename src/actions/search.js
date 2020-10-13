import { APIurls } from '../helpers/url';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { FETCH_SEARCH_RESULTS_SUCCESS } from './actionTypes';

export function searchUsers(searchText) {
  return (dispatch) => {
    const url = APIurls.userSearch(searchText);

    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('search data', data);
        if (data.success) {
          dispatch(searchResultsSuccess(data.data.users));
        } else {
          dispatch(searchResultsSuccess([]));
        }
      });
  };
}

export function searchResultsSuccess(users) {
  return {
    type: FETCH_SEARCH_RESULTS_SUCCESS,
    users: users,
  };
}
