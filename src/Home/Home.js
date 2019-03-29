import React, { Component } from 'react';
import HistoryHelper from '../History/History';
import './home.css';
import Header from '../Header/Header';

class Home extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  state = {
    income: null,
    savings: null,
    spendLimit: null,
    expenses: []
  };

  handleSubmitDemo = e => {
    e.preventDefault();
    this.setState(
      {
        savings: e.target.income.value,
        income: e.target.savings.value
      },
      () => {
        this.handleResults();
      }
    );
    e.target.reset();
  };

  handleAddExpense = e => {
    e.preventDefault();
    const addExpense = {
      name: e.target.name.value,
      amount: e.target.amount.value
    };
    console.log(addExpense);
    this.setState({ expenses: [...this.state.expenses, addExpense] });
    e.target.reset();
    e.target.name.focus();
  };

  handleResults() {
    const income = Number(this.state.income);
    const savings = Number(this.state.savings);
    const subtotal = savings - income;
    const newArr = [];
    let sum = 0;
    for (let i = 0; i < this.state.expenses.length; i++) {
      newArr.push(Number(this.state.expenses[i].amount));
    }
    for (let i = 0; i < newArr.length; i++) {
      sum += newArr[i];
    }
    const spendLimit = subtotal - sum;
    console.log(spendLimit);
    this.setState({ spendLimit });
  }

  handleButton(loc) {
    HistoryHelper.historyGoTo(loc, this.props);
  }

  render() {
    const handleList = this.state.expenses.map(exp => {
      return (
        <li key={exp.id}>
          {exp.name}: ${exp.amount}
          <p />
        </li>
      );
    });

    return (
      <div className="page_container ">
        <Header />
        <div className="user_buttons">
          <button
            type="button"
            id="login"
            onClick={() => this.handleButton('/login')}
          >
            Login
          </button>
          <button
            type="button"
            id="register"
            onClick={() => this.handleButton('/register')}
          >
            Register
          </button>
        </div>
        <div className="content_container">
          <div className="user_instructions">
            <header id="instructions_heading">
              <p>How to use:</p>
            </header>
            <section id="expense_instructions">
              <p>
                First, lets add up your bills and other expenses by entering
                them into the expenses field and clicking "Add expense". This
                will add your expense to a list. Once you have entered all your
                expenses, move to the income portion of this application
              </p>
            </section>
            <section id="income_instructions">
              <p>
                Second, add your monthly income in the income field. Both fields
                are required. Once you have completed this portion, click the
                "How much can I spend?" button to calculate the money you will
                have left for the current month after bills.
              </p>
            </section>
            <section id="extended features">
              <p>
                The extended features of this app allow you to save your
                expenses and add items to a wishlist. This app can give you an
                estimate to when you will be able to purchase the items on your
                wishlist after completing the new budget creation process. These
                features are only available for registered users.
              </p>
            </section>
          </div>
          <div className="input_container">
            <form
              className="demo_expenses"
              onSubmit={e => this.handleAddExpense(e)}
            >
              <div className="demo_monthly_expenses">
                <label htmlFor="demo_name">Expense name</label>
                <input
                  type="text"
                  required
                  name="name"
                  id="demo_name"
                  placeholder='e.g. "Rent"'
                />
                <label htmlFor="demo_amount">Amount</label>
                <input
                  type="number"
                  required
                  name="amount"
                  id="demo_amount"
                  placeholder="$1500.00"
                />
                <button type="submit" id="expense_button">
                  Add Expense
                </button>
                <ul>{handleList}</ul>
              </div>
            </form>
            <form
              className="demo_income"
              onSubmit={e => this.handleSubmitDemo(e)}
            >
              <div className="income_section">
                <label htmlFor="demo_income">Monthly Income</label>
                <input
                  type="number"
                  required
                  name="income"
                  id="demo_income"
                  placeholder="$4000.00"
                />
                <label htmlFor="demo_savings">Amount to add to savings</label>
                <input
                  type="number"
                  required
                  name="savings"
                  id="demo_savings"
                  placeholder="$150.00"
                />
              </div>
              <button type="submit" id="spend_button">
                How much can I spend
              </button>
            </form>
            <div className="demo_sum">
              <p>Monthly Allowance: </p>
              <h3>${this.state.spendLimit}</h3>
            </div>
          </div>
        </div>
        <h3>
          Login or register to save your information and access extended
          features
        </h3>
      </div>
    );
  }
}

export default Home;
