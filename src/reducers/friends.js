import { FETCH_FRIENDS_SUCCESS, ADD_FRIEND } from '../actions/actionTypes';

const defaultFriendsState = [];

export default function friends(state = defaultFriendsState, action) {
  switch (action.type) {
    case FETCH_FRIENDS_SUCCESS:
      return [...action.friends];

      case ADD_FRIEND:
      return state.concat(action.friend)

    default:
      return state;
  }
}
