import React, { Component } from 'react';
import HistoryHelper from '../History/History';
import './home.css'
import Header from '../Header/Header';

class Home extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }
  
  state = {
    income: null,
    savings: null,
    spendLimit: null,
    expenses: []
  };

  handleSubmitDemo = e => {
    e.preventDefault()
    this.setState({
      savings: e.target.income.value,
      income: e.target.savings.value
    }, ()=>{
      this.handleResults();
    })
    e.target.reset();

  }

  handleAddExpense = e => {
    e.preventDefault()  
    const addExpense = {
      name: e.target.name.value,
      amount: e.target.amount.value
    }
    console.log(addExpense)
    this.setState({expenses : [...this.state.expenses, addExpense]})
    e.target.reset();
    e.target.name.focus();
  }

  handleResults(){
    const income =Number(this.state.income);
    const savings =Number(this.state.savings);
    const subtotal = (savings-income);
    const newArr = [];
    let sum = 0;
    for(let i=0; i<this.state.expenses.length; i++){
     newArr.push(Number(this.state.expenses[i].amount))
    }
    for(let i=0; i<newArr.length; i++){
      sum += newArr[i];
    }
    const spendLimit = subtotal - sum;
    console.log(spendLimit)
    this.setState({spendLimit})
  }

  handleButton(loc){
    HistoryHelper.historyGoTo(loc, this.props)
  }

  render() {

    const handleList = this.state.expenses
    .map((exp) => {return <li key={exp.id}>
    {exp.name}: ${exp.amount}<p/>
    </li>
    })

    return (
      <div className='page_container '>
        <Header />
        <div className='user_buttons'>
        <button type='button' id='login' onClick={() => this.handleButton('/login')}>Login</button>
        <button type='button' id='register' onClick={() => this.handleButton('/register')}>Register</button>
        </div>
        <div className='input_container'>
        <form className='demo_expenses' onSubmit={(e) => this.handleAddExpense(e)}>
          <div className="demo_monthly_expenses">
            <label htmlFor="demo_expense_name">Expense name</label>
            <input type='text' required name="name" id="demo_name" placeholder='e.g. "Rent"' />
            <label htmlFor="demo_expense_amount">Amount</label>
            <input type='number' required name="amount" id="demo_amount" placeholder='$1500.00' />
            <button type='submit' id='expense_button'>Add Expense</button>
            <ul>
             {handleList}
            </ul>
          </div>
          </form>
        <form className="demo_income" onSubmit={(e) => this.handleSubmitDemo(e)}>
          <div className="income_section">
            <label htmlFor="demoPage_income">Monthly Income</label>
            <input type='number' required name="income" id="demo_income" placeholder='$4000.00' />
            <label htmlFor="demoPage_savings">Amount to add to savings</label>
            <input type='number' required name="savings" id="demo_savings" placeholder='$150.00' />
          </div>
          <button type="submit" id='spend_button'>How much can I spend</button>
          </form>
          <div className='demo_sum'>
          <p>Monthly Allowance: </p><h3>${this.state.spendLimit}</h3>
          </div>
          </div>
        <h3>Login or register to save your information and access extended features</h3>
      </div>
    );
  }
}

export default Home;
