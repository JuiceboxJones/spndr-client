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

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path={'/'} component={Home}/>
          <Route exact path={'/login'} component={LoginPage}/>
          <Route exact path={'/register'} component={RegistrationPage}/>
          <Route exact path={'/welcome'} component={Welcome} />
          <Route exact path={'/summary'} component={Summary} />
          <Route exact path={'/income'} component={Income} />
          <Route exact path={'/expenses'} component={Expenses} />
          <Route exact path={'/wishlist'} component={Wishlist} />
        </Switch>
      </div>
    );
  }
}

export default App;
