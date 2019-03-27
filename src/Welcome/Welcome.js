import React, { Component } from 'react';
import ApiService from '../services/api-fetch-services';
import TokenService from '../services/token-service';
import HistoryHelper from '../History/History';
import Header from '../Header/Header';
import './welcome.css'

//current date without time  new Date().toISOString().slice(0,10)

class Welcome extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  state = {
    expensesTotal: null,
    expenses: [],
    income: null,
    wishlist: [],
    spendLimit: null,
    editWishlist: false,
    editExpenses: false
  };

  componentDidMount() {
    Promise.all([
      ApiService.getExpenses(),
      ApiService.getIncome(),
      ApiService.getWishlist()
    ]).then(data =>
      this.setState(
        {
          expenses: data[0],
          income: data[1],
          wishlist: data[2]
        },
        () => this.handleExpensesTotal(this.state.expenses)
      )
    );
  }


  handleExpensesTotal(exp) {
    if (exp.length !== 0) {
      const newArr = [];
      for (let i = 0; i < exp.length; i++) {
        newArr.push(Number(exp[i].amount));
      }
      const presum = newArr.reduce((a, b) => a + b);
      const sum = presum.toFixed(2)
      this.setState({ expensesTotal: sum }, () =>
        this.handleIncome(this.state.income)
      );
    }
  }

  handleDelete(e) {
    ApiService.deleteExpense(e);
    this.handleDeleteitem(e);
  }

  handleDeleteitem = e => {
    const expenses = this.state.expenses.filter(item => item.id !== e);
    this.setState(
      { expenses },
      () => this.handleExpensesTotal(this.state.expenses),
      this.handleIncome(this.state.income)
    );
  };

  handleIncome(inc) {
    if (inc.length !== 0) {
      const subtotal = inc[0].income - inc[0].add_savings;
      const total = subtotal - this.state.expensesTotal;
      const limit = total.toFixed(2);
      this.setState({ spendLimit: limit });
    }
  }

  handleLogout = e => {
    TokenService.clearAuthToken();
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/';
    history.push(destination);
  };

  handleButtonNav(page) {
    HistoryHelper.historyGoTo(page, this.props);
  }

  render() {
    const handleWishlist = this.state.wishlist.map(wishes => {
      return (
        <li key={wishes.id}>
          <a href={wishes.url}>{wishes.name}</a><span/> ${wishes.price}
          <p />
        </li>
      );
    });

    const handleExpenseList = this.state.expenses.map(exp => {
      return (
        <li key={exp.id}>
          <p>
             {exp.name}<span />${exp.amount}
            <button id='delete_expense' type="button" onClick={() => this.handleDelete(exp.id)}>
            <span id='delete' role="img" aria-label="delete">❌</span>
            </button>{' '}
          </p>
        </li>
      );
    });

    return (
      <div>
        <header>
          <Header />
        </header>
        <div className="current_limit">
          <h3>
            Currently, your monthly spending budget is: 
            <p/>${this.state.spendLimit}
          </h3>
          <button type="button" id='new_budget_button' onClick={() => this.handleButtonNav('/income')}>
            New Budget
          </button>
        </div>
        <div className="wishlist_window">
          <h3>My Wishlist</h3>
          <ul>{handleWishlist}</ul>
          <button type="button" id='edit' onClick={() => this.handleButtonNav('/wishlist')}>Edit Wishlist</button>
        </div>
        <div className="expenses_window">
          <h3>Current Expenses</h3>
          <ul>{handleExpenseList}</ul>
          <h4>Total: <span id='red_total'>${this.state.expensesTotal}</span></h4>
        </div>
        <div className="button_menu">
          <button type="button" id='logout_button' onClick={e => this.handleLogout(e)}>
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default Welcome;
