import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class PostsList extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div className="posts-list">
        {posts.map((post) => (
          <div className="post-wrapper" key={post._id}>
            <div className="post-header">
              <div className="post-avatar">
                <Link to={`/user/${post.user._id}`}>
                  <img
                    src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                    alt="user-pic"
                  />
                </Link>
                <div>
                  <Link to={`/user/${post.user._id}`}>
                    <span className="post-author">{post.user.name}</span>
                  </Link>
                  <span className="post-time">A minute ago</span>
                </div>
              </div>
              <div className="post-content">{post.content}</div>
              <div className="post-actions">
                <div className="post-like">
                  <img
                    src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                    alt="like-icon"
                  />
                  <span>{post.likes.length}</span>
                </div>
                <div className="post-comments-icon">
                  <img
                    src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
                    alt="comment-icon"
                  />
                  <span>{post.comments.length}</span>
                </div>
              </div>
              <div className="post-comment-box">
                <input placeholder="Start typing a comment..." />
              </div>
              <div className="post-comments-list">
                <div className="post-comment-item">
                  <div className="post-comment-header">
                    <span className="post-comment-author">Joy</span>
                    <span className="post-comment-time">a minute ago</span>
                    <span className="post-comment-likes">34</span>
                  </div>
                  <div className="post-comment-content">test Comment</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostsList;
