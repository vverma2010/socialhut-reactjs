import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import '../chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      typedMessage: '',
    };
    this.socket = io.connect('http://54.237.158.65:5000');
    this.userEmail = props.user.email;
    // console.log('message prop', props);

    if (this.userEmail) {
      this.setupConnections();
    }
  }

  setupConnections = () => {
    const socketConnection = this.socket;
    const self = this;

    this.socket.on('connect', function () {
      console.log('connection established');

      socketConnection.emit('join_room', {
        user_email: this.userEmail,
        chatroom: 'codeial',
      });

      socketConnection.on('user_joined', function (data) {
        console.log('New user joined', data);
      });
    });

    this.socket.on('receive_message', function (data) {
      // add message to state
      const { messages } = self.state;
      const messageObject = {};
      messageObject.content = data.message;

      if (data.user_email === self.userEmail) {
        messageObject.self = true;
      }

      self.setState({
        messages: [...messages, messageObject],
        typedMessage: '',
      });
    });
  };

  handleSubmit = () => {
    const { typedMessage } = this.state;
    if (typedMessage && this.userEmail) {
      this.socket.emit('send_message', {
        message: typedMessage,
        user_email: this.userEmail,
        chatroom: 'codeial',
      });
      console.log('sent');
    }
  };
  render() {
    const { typedMessage, messages } = this.state;
    return (
      <div className="chat-container">
        <div className="chat-header">
          Chat
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/179/179396.svg"
            alt="close"
            height={17}
          />
        </div>
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              className={
                message.self
                  ? 'chat-bubble self-chat'
                  : 'chat-bubble other-chat'
              }
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            placeholder="Type a message"
            value={typedMessage}
            onChange={(e) => this.setState({ typedMessage: e.target.value })}
          />
          <button onClick={this.handleSubmit}>
            <img
              src="https://www.flaticon.com/svg/static/icons/svg/786/786306.svg"
              alt=""
              height={17}
            />
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}

export default connect(mapStateToProps)(Chat);
