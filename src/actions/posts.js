import {
  ADD_COMMENT,
  UPDATE_POSTS,
  UPDATE_POST_LIKES,
} from '../actions/actionTypes';
import { APIurls } from '../helpers/url';
import { getAuthTokenFromLocalStorage, getFormBody } from '../helpers/utils';
import { ADD_POST } from './actionTypes';

export function fetchPosts() {
  return (dispatch) => {
    const url = APIurls.fetchPosts();
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(updatePosts(data.data.posts));
      });
  };
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts: posts,
  };
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post: post,
  };
}

export function createPost(content) {
  return (dispatch) => {
    const url = APIurls.createPost();

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ content }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);

        if (data.success) {
          dispatch(addPost(data.data.post));
        }
      });
  };
}

export function addComment(comment, postId) {
  return {
    type: ADD_COMMENT,
    comment: comment,
    postId: postId,
  };
}

export function createComment(content, postId) {
  return (dispatch) => {
    const url = APIurls.createComment();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ content, post_id: postId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(addComment(data.data.comment, postId));
        }
      });
  };
}

export function addLike(id, likeType, userId) {
  return (dispatch) => {
    const url = APIurls.toggleLike(id, likeType);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);

        if (data.success) {
          dispatch(addLikeToStore(id, userId));
        }
      });
  };
}

export function addLikeToStore(postId, userId) {
  return {
    type: UPDATE_POST_LIKES,
    postId: postId,
    userId: userId,
  };
}
