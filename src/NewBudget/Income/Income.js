import React, { Component } from 'react';
import ApiService from '../../services/api-fetch-services';
import HistoryHelper from '../../History/History';


class Income extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }
  
  state = {
    previousIncome: []
  }



  componentDidMount(){
    ApiService.getIncome()
    .then(data => {
      this.setState({ previousIncome: data })
    })
      
  }

  handleSubmitIncome = e => {
    const income = {
      add_savings:  e.target.savings.value,
      income:       e.target.income.value,
      bank_balance: e.target.balance.value
    }
    ApiService.postIncome(income)
    this.handleDeletePrev()
    this.handleNext()

  }

  handleDeletePrev(){
    if(this.state.previousIncome.length !== 0){
      ApiService.deleteIncome(this.state.previousIncome[0].id)}
  }

  handleNext(e){
    HistoryHelper.historyGoTo('/expenses', this.props)
  }

  handlePreviousIncome = () => {
    const income = this.state.previousIncome
    if(income === null || income.length < 1){
      return <div>Let's Get Started! Step 1 of 3</div>
    } else{
      const inc = this.state.previousIncome[0]
      return <div>
        <p>Previous Income:</p>
        <p>Bank balance: ${inc.bank_balance} Income: ${inc.income} Add to savings: ${inc.add_savings}</p>
        <button type='button' onClick={(e) => this.handleNext(e)}>Use previous income</button>
      </div>
    }
  }

  render() { 


    return ( 
      <div>
        <header>
          <h2>Add Income</h2>
        </header>
          <div>
          {this.handlePreviousIncome()}
          </div>
      <form className="income" onSubmit={(e) => this.handleSubmitIncome(e)}>
          <div className="income_section">
            <p>New Income:</p>
            <label htmlFor='user_balance'>Current account balance</label>
            <p/>
            <input type='number' step='0.01' name='balance' id='balance' />
            <label htmlFor="user_income">Monthly Income</label>
            <p/>
            <input type='number' step='0.01' required name="income" id="income" />
            <label htmlFor="user_savings">Amount to add to savings</label>
            <p/>
            <input type='number' step='0.01' required name="savings" id="savings" />
          </div>
          <button type="submit">Create new income</button>
          </form>
          </div>
     );
  }
}
 
export default Income;