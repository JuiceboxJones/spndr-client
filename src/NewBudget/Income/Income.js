import React, { Component } from 'react';
import ApiService from '../../services/api-fetch-services';
import HistoryHelper from '../../History/History';
import './income.css';

class Income extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  state = {
    previousIncome: []
  };

  componentDidMount() {
    ApiService.getIncome().then(data => {
      this.setState({ previousIncome: data });
    });
  }

  handleSubmitIncome = e => {
    const income = {
      add_savings: e.target.savings.value,
      income: e.target.income.value,
      bank_balance: e.target.balance.value
    };
    ApiService.postIncome(income);
    this.handleDeletePrev();
    this.handleNext();
  };

  handleDeletePrev() {
    if (this.state.previousIncome.length !== 0) {
      ApiService.deleteIncome(this.state.previousIncome[0].id);
    }
  }

  handleNext(e) {
    HistoryHelper.historyGoTo('/expenses', this.props);
  }

  handlePreviousIncome = () => {
    const income = this.state.previousIncome;
    if (income === null || income.length < 1) {
      return <div>Let's Get Started! Step 1 of 3</div>;
    } else {
      const inc = this.state.previousIncome[0];
      return (
        <div>
          <h2>Previous Income:</h2>
          <div className="prev_income_display">
            <p>
              Bank balance: ${inc.bank_balance} <br /> Income: ${inc.income}{' '}
              <br /> Add to savings: ${inc.add_savings}
            </p>
            <button
              type="button"
              id="income_buttons"
              onClick={e => this.handleNext(e)}
            >
              Use previous income
            </button>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="income_page_container">
        <header id="header">
          <h2>Add Income</h2>
          <p>Step 2 of 3</p>
        </header>
        <div className="form_box">
          <div className="previous_income">{this.handlePreviousIncome()}</div>
          <form className="income" onSubmit={e => this.handleSubmitIncome(e)}>
            <div className="income_section">
              <h2>New Income:</h2>
              <label htmlFor="balance">Current account balance</label>
              <p />
              <input type="number" step="0.01" name="balance" id="balance" />
              <label htmlFor="income">Monthly Income</label>
              <p />
              <input
                type="number"
                step="0.01"
                required
                name="income"
                id="income"
              />
              <label htmlFor="savings">Amount to add to savings</label>
              <p />
              <input
                type="number"
                step="0.01"
                required
                name="savings"
                id="savings"
              />
            </div>
            <button type="submit" id="income_buttons">
              Create new income
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Income;
