import React, { Component } from 'react';
import { FriendsList, PostsList } from './';
import Chat from './Chat';

class Home extends Component {
  render() {
    const { posts, friends, isLoggedIn } = this.props;
    return (
      <div className="home">
        <PostsList posts={posts} />
        {isLoggedIn && <FriendsList friends={friends} />}
        {isLoggedIn && <Chat />}
      </div>
    );
  }
}

export default Home;
