import {
  ADD_COMMENT,
  ADD_POST,
  // UPDATE_COMMENT_LIKES,
  UPDATE_POSTS,
  UPDATE_POST_LIKES,
} from '../actions/actionTypes';

export default function posts(state = [], action) {
  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;
    case ADD_POST:
      return [action.post, ...state];
    case ADD_COMMENT:
      const newPosts = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            comments: [action.comment, ...post.comments],
          };
        }
        return post;
      });
      return newPosts;
    case UPDATE_POST_LIKES:
      const newPostLikes = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            likes: [...post.likes, action.userId],
          };
        }
        return post;
      });
      return newPostLikes;
    // case UPDATE_COMMENT_LIKES:
    //   const newCommentLikes = state.map((comment) => {
    //     if (comment._id === action.postId) {
    //       return {
    //         ...comment,
    //         likes: [...comment.likes, action.userId],
    //       };
    //     }
    //     return comment;
    //   });
    //   return newCommentLikes;
    default:
      return state;
  }
}
