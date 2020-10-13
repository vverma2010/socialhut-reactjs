import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Comment from './Comment';
import { PropTypes } from 'prop-types';
import { addPostLike, createComment } from '../actions/posts';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
    };
  }

  handleAddComment = (e) => {
    const { post } = this.props;
    const { comment } = this.state;

    if (e.key === 'Enter') {
      this.props.dispatch(createComment(comment, post._id));

      this.setState({
        comment: '',
      });
    }
  };

  handleOnCommentChange = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };

  handlePostLike = () => {
    const { post, user } = this.props;
    this.props.dispatch(addPostLike(post._id, 'Post', user._id));
  };

  render() {
    const { post, user } = this.props;
    const { comment } = this.props;

    const isPostLikedByUser = post.likes.includes(user._id);
    return (
      <div className="post-wrapper" key={post._id}>
        <div className="post-header">
          <div className="post-avatar">
            <Link to={`/user/${post.user._id}`}>
              <img
                src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                alt="user-pic"
              />
            </Link>
            <div className="post-user">
              <Link to={`/user/${post.user._id}`}>
                <span className="post-author">{post.user.name}</span>
              </Link>
              <span className="post-time">A minute ago</span>
            </div>
          </div>
          <div className="post-content">{post.content}</div>
          <div className="post-actions">
            <button className="post-like no-btn" onClick={this.handlePostLike}>
              {isPostLikedByUser ? (
                <img
                  src="https://www.flaticon.com/svg/static/icons/svg/148/148838.svg"
                  alt="like-post"
                />
              ) : (
                <img
                  src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                  alt="like-icon"
                />
              )}
              <span>{post.likes.length}</span>
            </button>
            <div className="post-comments-icon">
              <img
                src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
                alt="comment-icon"
              />
              <span>{post.comments.length}</span>
            </div>
          </div>
          <div className="post-comment-box">
            <input
              placeholder="Start typing a comment..."
              onChange={this.handleOnCommentChange}
              onKeyPress={this.handleAddComment}
              value={comment}
            />
          </div>
          <div className="post-comments-list">
            {post.comments.map((comment) => (
              <Comment comment={comment} key={comment._id} postId={post._id} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}

export default connect(mapStateToProps)(Post);
