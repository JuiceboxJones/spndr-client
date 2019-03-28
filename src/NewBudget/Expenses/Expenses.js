import React, { Component } from 'react';
import ApiService from '../../services/api-fetch-services';
import HistoryHelper from '../../History/History';
import './expenses.css'

class Expenses extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }
  
  state = {
    expenses: []
  };

componentDidMount(){
  ApiService.getExpenses()
  .then(data => {
    this.setState({expenses: data})
  })
}

  handleAddExpense = e => {
    e.preventDefault();
    const addExpense = {
      name: e.target.name.value,
      amount: e.target.amount.value };
    ApiService.postExpenses(addExpense).then(exp => 
    {this.setState({ expenses: [...this.state.expenses, exp] });})
    e.target.reset();
    e.target.name.focus()
  };

  handleDelete(e) {
    ApiService.deleteExpense(e)
    this.handleDeleteitem(e)
  }
  
  handleDeleteitem = (e) => {
    const expenses = this.state.expenses
    .filter(item => item.id !== e)
    this.setState({expenses})
  }

  handleNext(){
    HistoryHelper.historyGoTo('/wishlist', this.props)
  }
  handleBack(){
    HistoryHelper.historyGoBack(this.props)
  }

  render() {

    const handleList = this.state.expenses
    .map((exp, index) => {
      return <li key={exp.id || index }>
      {exp.name} <span/> ${exp.amount} <button type='button' id='delete' onClick={() => this.handleDelete(exp.id)}>
      <span id='delete' role="img" aria-label="delete">❌</span></button>
      </li>
    })

    return (
      <div className='expensesContainer'>
      <header id='header'>
        <h2>Add Expenses</h2>
        <p>Step 2 of 3</p>
      </header>
      <div className='form_container'>
        <form className="current_expenses" onSubmit={e => this.handleAddExpense(e)}>
        <div className="current_monthly_expenses">
          <label htmlFor="current_name">Expense name</label>
          <input type="text" required name="name" id="current_name" />
          <label htmlFor="current_amount">Amount</label>
          <input type="number" step='0.01' required name="amount" id="current_amount" />
          <button id='add_expense' type="submit">Add Expense</button>
        </div>
        <div className='expense_list'>
        <ul>{handleList}</ul>
        </div>
        <div className='button_container'>
        <button type='button' id='back_button' onClick={(e) => this.handleBack(e)}>Back</button>
        <button type="button" id='next_button' onClick={(e) => this.handleNext(e)}>Next</button>
        </div>
      </form>
      </div>
      </div>

    );
  }
}

export default Expenses;
