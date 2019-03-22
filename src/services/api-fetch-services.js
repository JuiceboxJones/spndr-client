import config from '../config'
import TokenService from './token-service'





const ApiService = {

getExpenses() {
  return fetch(`${config.API_ENDPOINT}/expenses`, {
    headers: {
      'authorization' : `bearer ${TokenService.getAuthToken()}`
    },
  })
  .then(res => 
    (!res.ok) ? res.json()
    .then(e => Promise.reject(e)) : res.json())
},

postExpenses(exp) {
  return fetch(`${config.API_ENDPOINT}/expenses`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      'authorization' : `bearer ${TokenService.getAuthToken()}`
    },
    body: JSON.stringify(exp)
  }).then(res =>
    !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
  );
},

deleteExpense(params){
  return fetch(`${config.API_ENDPOINT}/expenses/${params}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      'authorization' : `bearer ${TokenService.getAuthToken()}`
    },
    
    }).then(res => {
      if(!res.ok) {
        return Promise.reject()}
        else {
          console.log('deleted')
        }
    })
    .catch(error => {
      console.log({error})
    })
},

getIncome() {
  return fetch(`${config.API_ENDPOINT}/income`, {
    headers: {
      'authorization' : `bearer ${TokenService.getAuthToken()}`
    },
  })
  .then(res => 
    (!res.ok) ? res.json()
    .then(e => Promise.reject(e)) : res.json())
},

postIncome(inc) {
  return fetch(`${config.API_ENDPOINT}/income`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      'authorization' : `bearer ${TokenService.getAuthToken()}`
    },
    body: JSON.stringify(inc)
  }).then(res =>
    !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
  );
},

deleteIncome(params){
  return fetch(`${config.API_ENDPOINT}/income/${params}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      'authorization' : `bearer ${TokenService.getAuthToken()}`
    },
    
    }).then(res => {
      if(!res.ok) {
        return Promise.reject()}
        else {
          console.log('deleted')
        }
    })
    .catch(error => {
      console.log({error})
    })
},

getWishlist() {
  return fetch(`${config.API_ENDPOINT}/wishlist`, {
    headers: {
      'authorization' : `bearer ${TokenService.getAuthToken()}`
    },
  })
  .then(res => 
    (!res.ok) ? res.json()
    .then(e => Promise.reject(e)) : res.json())
},

postWishlist(wish) {
  return fetch(`${config.API_ENDPOINT}/wishlist`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      'authorization' : `bearer ${TokenService.getAuthToken()}`
    },
    body: JSON.stringify(wish)
  }).then(res =>
    !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
  );
},

deleteWish(params){
  return fetch(`${config.API_ENDPOINT}/wishlist/${params}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      'authorization' : `bearer ${TokenService.getAuthToken()}`
    },
    
    }).then(res => {
      if(!res.ok) {
        return Promise.reject()}
        else {
          console.log('deleted')
        }
    })
    .catch(error => {
      console.log({error})
    })
}

}

export default ApiService;
