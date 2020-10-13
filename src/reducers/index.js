import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import profile from './profile';
import friends from './friends';
import search from './search';

export default combineReducers({
  posts: posts,
  auth: auth,
  profile: profile,
  friends: friends,
  search: search,
});
