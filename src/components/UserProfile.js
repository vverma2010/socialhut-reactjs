import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFriend, removeFriend } from '../actions/friends';
import { fetchUserProfile } from '../actions/profile';
import { APIurls } from '../helpers/url';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
// import { checkPropTypes } from 'prop-types';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      error: null,
      successMessage: null,
    };
  }
  componentDidMount() {
    const { match } = this.props;
    console.log('is it', this.props);

    if (match.params.userId) {
      // dispatch an action to fetch user profile
      this.props.dispatch(fetchUserProfile(match.params.userId));
      console.log('match', match.params.userId);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      match: { params: prevParams },
    } = prevProps;
    const {
      match: { params: currentParams },
    } = this.props;

    if (
      prevParams &&
      currentParams &&
      prevParams.userId !== currentParams.userId
    ) {
      this.props.dispatch(fetchUserProfile(currentParams.userId));
    }
  }

  checkIfUserIsAFriend = () => {
    console.log('is props', this.props);
    const { match, friends } = this.props;
    const userId = match.params.userId;

    const index = friends.map((friend) => friend.to_user._id).indexOf(userId);
    if (index !== -1) {
      return true;
    }
    return false;
  };

  handleAddFriendClick = async () => {
    const userId = this.props.match.params.userId;
    const url = APIurls.addFriend(userId);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };

    const response = await fetch(url, options);

    const data = await response.json();

    if (data.success) {
      this.setState({
        success: true,
        successMessage: 'Friend added successfully !',
      });
      this.props.dispatch(addFriend(data.data.friendship));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

  handleRemoveFriendClick = async () => {
    const { match } = this.props;

    const url = APIurls.removeFriend(match.params.userId);

    const otherOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };

    const response = await fetch(url, otherOptions);
    const data = await response.json();
    console.log('await data', data);

    if (data.success) {
      this.setState({
        success: null,
        successMessage: 'Friend removed successfully !',
      });
      this.props.dispatch(removeFriend(match.params.userId));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

  render() {
    // const { user } = this.props.auth;
    console.log('this.props', this.props);
    const {
      match: { params },
      profile,
    } = this.props;
    console.log('this.props', params);
    const user = profile.user;

    if (profile.inProgress) {
      return <h1>Loading...</h1>;
    }

    const isUserAFriend = this.checkIfUserIsAFriend();
    const { error, success, successMessage } = this.state;
    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
            id="user-dp"
          />
        </div>
        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>
        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>
        <div className="btn-grp">
          {!isUserAFriend ? (
            <button
              className="btn save-btn"
              onClick={this.handleAddFriendClick}
            >
              Add Friend
            </button>
          ) : (
            <button
              className="btn save-btn"
              onClick={this.handleRemoveFriendClick}
            >
              Remove Friend
            </button>
          )}

          {success && (
            <div className="alert success-dialog">{successMessage}</div>
          )}
          {error && <div className="alert error-dialog">{error}</div>}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ profile, friends }) {
  return {
    profile: profile,
    friends: friends,
  };
}

export default connect(mapStateToProps)(UserProfile);
