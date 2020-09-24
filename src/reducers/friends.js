import { FETCH_FRIENDS_SUCCESS } from '../actions/actionTypes';

const defaultFriendsState = [];

export default function friends(state = defaultFriendsState, action) {
  switch (action.type) {
    case FETCH_FRIENDS_SUCCESS:
      return [...action.friends];

    default:
      return state;
  }
}
