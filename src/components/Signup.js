import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { startSignup, signup, clearAuthState } from '../actions/auth';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
    };
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }

  handleInputChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const { email, password, cofirmPassword, name } = this.state;
    if (email && password && cofirmPassword && name) {
      this.props.dispatch(startSignup());
      this.props.dispatch(signup(email, password, cofirmPassword, name));
    }
  };

  render() {
    const { inProgress, error, isLoggedIn } = this.props.auth;

    if(isLoggedIn) {
      return <Redirect  to="/"/>
    }

    return (
      <form className="login-form">
        <span className="login-signup-header">Sign Up</span>
        {error && <div className="error-dialog">{error}</div>}
        <div className="field">
          <input
            type="text"
            placeholder="Enter Name"
            required
            onChange={(e) => this.handleInputChange('name', e.target.value)}
          />
        </div>
        <div className="field">
          <input
            type="email"
            placeholder="Enter Email"
            required
            onChange={(e) => this.handleInputChange('email', e.target.value)}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Enter Password"
            required
            onChange={(e) => this.handleInputChange('password', e.target.value)}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Confirm Password"
            required
            onChange={(e) =>
              this.handleInputChange('confirmPassword', e.target.value)
            }
          />
        </div>
        <div className="field">
          <button onClick={this.onFormSubmit} disabled={inProgress}>
            Sign Up
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth: auth,
});

export default connect(mapStateToProps)(Signup);
