import React, { Component } from 'react';
import ApiService from '../../services/api-fetch-services';
import HistoryHelper from '../../History/History';
import './summary.css';

class Summary extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  state = {
    expenses: [],
    income: [],
    wishlist: [],
    accountBal: null,
    expenseTotal: null
  };

  componentDidMount() {
    Promise.all([
      ApiService.getExpenses(),
      ApiService.getIncome(),
      ApiService.getWishlist()
    ]).then(data =>
      this.setState(
        {
          income: data[1],
          expenses: data[0],
          wishlist: data[2]
        },
        () => this.handleExpensesTotal(this.state.expenses)
      )
    );
  }

  handleExpensesTotal(exp) {
    const newArr = [];
    for (let i = 0; i < exp.length; i++) {
      newArr.push(Number(exp[i].amount));
      const sum = newArr.reduce((a, b) => a + b);
      this.setState({ expenseTotal: sum }, () =>
        this.handleCurrentAccountBal()
      );
    }
  }

  handleCurrentAccountBal() {
    const inc = this.state.income[0];
    const subBal =
      Number(inc.bank_balance) + Number(inc.income) - Number(inc.add_savings);
    const accountBal = (subBal - this.state.expenseTotal).toFixed(2);
    this.setState({ accountBal });
  }

  handleWishlistPurchase(price) {
    if (price < Number(this.state.accountBal)) {
      return 'Now';
    }
    if (price > Number(this.state.accountBal)) {
      const monthlyInc = Number(this.state.income[0].income);
      const total = Math.round(price / monthlyInc);
      return total + ' Month(s)';
    }
  }

  handleDone() {
    HistoryHelper.historyGoTo('/welcome', this.props);
  }

  render() {
    const handleWishlist = this.state.wishlist.map(wishes => {
      return (
        <li key={wishes.id}>
          <a href={wishes.url}>{wishes.name}</a> <span>${wishes.price}</span>{' '}
          <span>Buy: {this.handleWishlistPurchase(wishes.price)}</span>
          <p />
        </li>
      );
    });

    const handleExpenseList = this.state.expenses.map(exp => {
      return (
        <li key={exp.id}>
          {exp.name}: ${exp.amount}
          <p />
        </li>
      );
    });
    const handleIncomeReadOut = this.state.income.map(user => {
      return (
        <div key={user.id}>
          <p>Account Balance: ${user.bank_balance}</p>
          <p>Monthly income: ${user.income}</p>
          <p>Adding to savings: ${user.add_savings}</p>
        </div>
      );
    });

    return (
      <div className="summaryContainer">
        <header id="header">
          <h2>Your Budget Summary</h2>
        </header>
        <div className="projectedBalance">
          <h4>
            Your projected account balance minus savings and expenses is:{' '}
          </h4>
          <h2>${this.state.accountBal}</h2>
        </div>
        <div className="userInfo">
          <div className="userIncome">
            <h4>Your income: </h4>
            {handleIncomeReadOut}
          </div>
          <div className="userExpenses">
            <h4>Monthly expenses: </h4>
            {handleExpenseList}
          </div>
          <div className="userWishlist">
            <h4>When can I buy items on my wishlist:</h4>
            {handleWishlist}
          </div>
        </div>
        <button type="button" id="done" onClick={e => this.handleDone(e)}>
          Done
        </button>
      </div>
    );
  }
}

export default Summary;
