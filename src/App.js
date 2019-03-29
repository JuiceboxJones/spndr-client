import React, { Component } from 'react';
import Home from './Home/Home';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import RegistrationPage from './RegistrationPage/RegistrationPage';
import LoginPage from './LoginPage/LoginPage';
import Welcome from './Welcome/Welcome';
import Summary from './NewBudget/Summary/Summary';
import Income from './NewBudget/Income/Income';
import Expenses from './NewBudget/Expenses/Expenses';
import Wishlist from './NewBudget/Wishlist/Wishlist';
import PrivateRoute from './Utils/PrivateRoute';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="banner">
          <div id="body">
            <Switch>
              <Route exact path={'/'} component={Home} />
              <Route exact path={'/login'} component={LoginPage} />
              <Route exact path={'/register'} component={RegistrationPage} />
              <PrivateRoute exact path={'/welcome'} component={Welcome} />
              <PrivateRoute exact path={'/summary'} component={Summary} />
              <PrivateRoute exact path={'/income'} component={Income} />
              <PrivateRoute exact path={'/expenses'} component={Expenses} />
              <PrivateRoute exact path={'/wishlist'} component={Wishlist} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
