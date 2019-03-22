import React, { Component } from 'react';
import ApiService from '../../services/api-fetch-services';
import HistoryHelper from '../../History/History'

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
    ApiService.postWishlist(item);
    this.setState({ wishlist: [...this.state.wishlist, item] });
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
          <button type='button' onClick={() => this.handleBack()}>Home</button>
        </div>
      )
    }else{
      return (
        <div className='nextButton'>
          <button type='button' onClick={() => this.handleBack()}>Back</button>
          <button type='button' onClick={() => this.handleNext()}>Next</button>
        </div>
      )
    }
  }

  render() {

    this.handleButtonRender()
    const handleList = this.state.wishlist.map((item, index) => {
      return (
        <li key={item.id || index }>
          <a href={item.url}>{item.name}</a> <span>${item.price}</span> <button type='button' onClick={() => this.handleDelete(item.id)}>️	DEL</button>
          <p />
        </li>
      );
    });

    return (
      <div>
        <header>
          <h2>Make a Wishlist</h2>
          <p>Step 3 of 3</p>
        </header>
        <form className="wishlist_form" onSubmit={e => this.handleAddToWishlist(e)}
        >
          <input type="text" required name="item_name" id="item_name" placeholder="Item Name"
          />
          <input type="text" required name="item_url" id="item_url" placeholder="URL"
          />
          <input type="number" step='0.01' required name="item_price" id="item_price" placeholder="price"
          />
          <button type="submit">Add to Wishlist</button>
        </form>
        <div>
          <ul>{handleList}</ul>
        </div>
        {this.handleButtonRender()}
      </div>
    );
  }
}

export default Wishlist;
