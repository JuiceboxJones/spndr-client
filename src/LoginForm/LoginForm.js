import React, { Component } from 'react';
import TokenService from '../services/token-service';
import AuthApiService from '../services/auth-api-service';
import { Link } from 'react-router-dom';

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  };

  state = { error: null };

  handleSubmitBasicAuth = ev => {
    ev.preventDefault();
    const { user_name, password } = ev.target;
    TokenService.saveAuthToken(
      TokenService.makeBasicAuthToken(user_name.value, password.value)
    );
    console.log('login form submitted');
    console.log({ user_name, password });

    user_name.value = '';
    password.value = '';
    this.props.onLoginSuccess();
  };

  handleSubmitJwtAuth = e => {
    e.preventDefault();
    this.setState({ error: null });
    const { user_name, password } = e.target;
    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value
    })
      .then(res => {
        user_name.value = '';
        password.value = '';
        TokenService.saveAuthToken(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch(res => {
        this.setState({
          error: res.error
        });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className="LoginForm" onSubmit={this.handleSubmitJwtAuth}>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <div className="user_name">
          <label htmlFor="LoginForm__user_name">User name:</label>
          <input required name="user_name" id="LoginForm__user_name" />
        </div>
        <div className="password">
          <label htmlFor="LoginForm__password">Password:</label>
          <input
            required
            name="password"
            type="password"
            id="LoginForm__password"
          />
        </div>
        <button type="submit" id="login_form_button">
          Login
        </button>
        <p/> 
        <Link to='/register'>Not a member? Register here.</Link>
      </form>
    );
  }
}
