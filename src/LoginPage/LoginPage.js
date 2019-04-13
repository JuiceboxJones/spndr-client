import React, { Component } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import Header from '../Header/Header';
import './login.css';

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/welcome';
    history.push(destination);
  };

  render() {
    return (
      <div>
        <Header />
        <div className="login_container">
          <section className="LoginPage">
            <h2>Login</h2>
            <p>Demo Credentials</p>
            <p>Username: Test123</p>
            <p>Password: Password1!</p>
            <LoginForm onLoginSuccess={this.handleLoginSuccess} />
          </section>
        </div>
      </div>
    );
  }
}
