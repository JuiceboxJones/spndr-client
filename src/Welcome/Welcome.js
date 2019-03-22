import React, { Component } from 'react';
import ApiService from '../services/api-fetch-services';
import TokenService from '../services/token-service';
import HistoryHelper from '../History/History';

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
      this.setState({
          expenses: data[0],
          income: data[1],
          wishlist: data[2]
        }, () => 
        this.handleExpensesTotal(this.state.expenses)
      ));
  }

  //make seperate edit wishlist page
  //when no items in wishlist say 'no items in wishlist'
  handleExpensesTotal(exp) {
    if (exp.length !== 0) {
      const newArr = [];
      for (let i = 0; i < exp.length; i++) {
        newArr.push(Number(exp[i].amount));
      }
      const sum = newArr.reduce((a, b) => a + b);
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

  handleButtonNav(page){
    HistoryHelper.historyGoTo(page, this.props)
  }

  render() {
    const handleWishlist = this.state.wishlist.map(wishes => {
      return (
        <li key={wishes.id}>
          <a href={wishes.url}>{wishes.name}</a> <span>${wishes.price}</span>
          <p />
        </li>
      );
    });

    const handleExpenseList = this.state.expenses.map(exp => {
      return (
        <li key={exp.id}>
          <p>
            {exp.name} ${exp.amount} {exp.date_created.slice(0, 10)}{' '}
            <button type="button" onClick={() => this.handleDelete(exp.id)}>
              DEL
            </button>{' '}
          </p>
        </li>
      );
    });

    return (
      <div>
        <div>
          <header>
            <h1>Welcome!</h1>
          </header>
          <h3>
            Currently, your monthly spending budget is: ${this.state.spendLimit}
          </h3>
        </div>
        <div>
          <h3>My Wishlist</h3>
          <ul>{handleWishlist}</ul>
        </div>
        <div>
          <h3>Current Expenses</h3>
          <span>Name</span> <span>Amount</span> <span>Date Created</span>
          <ul>{handleExpenseList}</ul>
          <h4>Total: ${this.state.expensesTotal}</h4>
        </div>
        <button type="button" onClick={e => this.handleLogout(e)}>
          Logout
        </button>
        <button type="button" onClick={() => this.handleButtonNav('/income')}>New Budget</button>
        <button type="button" onClick={() => this.handleButtonNav('/wishlist')}>Edit Wishlist</button>
      </div>
    );
  }
}

export default Welcome;
