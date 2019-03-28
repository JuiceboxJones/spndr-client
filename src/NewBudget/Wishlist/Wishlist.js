import React, { Component } from 'react';
import ApiService from '../../services/api-fetch-services';
import HistoryHelper from '../../History/History'
import './wishlist.css'

class Wishlist extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }
  
  state = {
    wishlist: []
  };

  componentDidMount() {
    ApiService.getWishlist().then(data => {
      this.setState({ wishlist: data });
    });
  }

  handleDeleteitem = (e) => {
    const wishlist = this.state.wishlist.filter(item => item.id !== e)
    this.setState({
      wishlist
    })
  }

  handleDelete(e) {
    ApiService.deleteWish(e)
    this.handleDeleteitem(e)
  }

  handleAddToWishlist = e => {
    e.preventDefault(e.item);
    const item = {
      name: e.target.item_name.value,
      url: e.target.item_url.value,
      price: e.target.item_price.value
    };
    ApiService.postWishlist(item).then(item => {
      this.setState({ wishlist: [...this.state.wishlist, item] });});
    e.target.reset();
    e.target.item_name.focus()
  };

  handleNext(){
    HistoryHelper.historyGoTo('/summary', this.props)
  }
  handleBack(){
    HistoryHelper.historyGoBack(this.props)
  }

  handleButtonRender(){
    if(this.props.location.state.prev === `/welcome`){
      return (
        <div className='nextButton'>
          <button type='button' id='home_button' onClick={() => this.handleBack()}>Home</button>
        </div>
      )
    }else{
      return (
        <div className='nextButton'>
          <button type='button' id='back_button' onClick={() => this.handleBack()}>Back</button>
          <button type='button' id='next_button' onClick={() => this.handleNext()}>Next</button>
        </div>
      )
    }
  }

  render() {

    this.handleButtonRender()
    const handleList = this.state.wishlist.map((item, index) => {
      return (
        <li key={item.id || index }>
          <a href={item.url}>{item.name}</a> <span id='wishlist_spacing'/>${item.price} <button type='button' id='delete' onClick={() => this.handleDelete(item.id)}>️
          <span id='delete' role="img" aria-label="delete">❌</span></button>
          <p />
        </li>
      );
    });

    return (
      <div className='wishlist_page_container'>
        <header id='header'>
          <h2>Make a Wishlist</h2>
          <p>Step 3 of 3</p>
        </header>
        <div className='wishlist_form_container'>
        <form className="wishlist_form" onSubmit={e => this.handleAddToWishlist(e)}
        >
          <div className='wishlist_input_container'>
          <label htmlFor=''>Item:</label> 
          <input type="text" required name="item_name" id="item_name" placeholder="e.g. 'New Car'"
          />
          <label htmlFor=''>URL:</label> 
          <input type="text" required name="item_url" id="item_url" placeholder="www.buyItHere.com"
          />
          <label htmlFor=''>Price:</label> 
          <input type="number" step='0.01' required name="item_price" id="item_price" placeholder="100.00"
          />
          <button type="submit" id='add_wishlist'>Add to Wishlist</button>
          </div>
        </form>
        </div>
        <div className='list_container'>
          <ul>{handleList}</ul>
          {this.handleButtonRender()}
        </div>
      </div>
    );
  }
}

export default Wishlist;
