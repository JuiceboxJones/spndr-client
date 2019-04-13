import React, { Component } from 'react';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import Header from '../Header/Header';
import './registration.css';

export default class RegistrationPage extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  handleRegistrationSuccess = user => {
    const { history } = this.props;
    history.push('/welcome');
  };

  render() {
    return (
      <div>
        <Header />
        <div className="registration_container">
          <section className="RegistrationPage">
            <h2>Register</h2>
            <RegistrationForm
              onRegistrationSuccess={this.handleRegistrationSuccess}
            />
          </section>
        </div>
      </div>
    );
  }
}
