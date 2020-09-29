import React from 'react';

function Comment({ comment }) {
  return (
    <div className="post-comment-item">
      <div className="post-comment-header">
        <span className="post-comment-author">{comment.user.name}</span>
        <span className="post-comment-time">a minute ago</span>
        <span className="post-comment-likes">{comment.likes.length}</span>
        <span className="like-count">
          <img
            src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
            alt="like-icon"
            // className="post-like"
          />
        </span>
      </div>
      <div className="post-comment-content">{comment.content}</div>
    </div>
  );
}

export default Comment;
