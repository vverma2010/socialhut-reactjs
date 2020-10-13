import React from 'react';
// import { addCommentLike } from '../actions/posts';

// handleCommentLike = () => {
//   const { comment, user } = this.props;
//   this.props.dispatch(addCommentLike(comment._id, 'Comment', user._id));
// };

function Comment({ comment }) {
  return (
    <div className="post-comment-item">
      <div className="post-comment-header">
        <span className="post-comment-author">{comment.user.name}</span>
        <span className="post-comment-time">a minute ago</span>
        <span className="post-comment-likes">{comment.likes.length}</span>
        <button className="like-count no-btn">
          <img
            src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
            alt="like-icon"
          />
        </button>
      </div>

      <div className="post-comment-content">{comment.content}</div>
    </div>
  );
}

export default Comment;
