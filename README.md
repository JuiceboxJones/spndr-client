
## SPNDR Finance Management. Simplified.

SPNDR is an application designed to give you an estimate on how much disposable income you will have at the end of each month.
The app will take in all the user submitted finances and calculate what is left over after bills and expenses have been paid.
SPNDR also incorporates a wishlist feature that allows you to add items you wish to purchase and gives you and estimate on when you 
will be able to afford the items you have listed. You can register to have access to that feature as well as the added benefit 
of having saved previous monthly expenses so that you don't have to enter them every time you want to create a new budget estimate.


## Tech Stack

Technologies used in the construction of this app: React, CSS3, HTML5, PostgreSQL, Node, Express

## Features

Login with the ability to save your information.
Add items with links to your wishlist.
Calculate the time it will take to afford items on your wishlist.
Add expenses to your profile with the ability to edit them as your finances change.
A summary read-out that returns all the information you've provided along with your spending budget.

## API Reference

View my server at - https://infinite-gorge-60127.herokuapp.com



## Screenshots

This is the demostration page. This page has limited features and will not save user information.
It will give you a general idea of what the app is capable of without having to register.
![Demonstration page](./src/resources/LandingPage.PNG?raw=true "Demonstration page")

The registration is very simple and straight-forward. Just provide your name, a username,
and password and you're all set!
![Registration page](./src/resources/RegistrationPage.PNG?raw=true "Registration page")

There's not much to the login page. Just enter your credentials and you're on your way
to accessing the full capabilities of this app.
![Login page](./src/resources/LoginPage.PNG?raw=true "Login page")

The welcome page will give you your most current budget estimate. From here, you can create a new
budget, remove expenses to see how it affects your spending allowance, and edit your wishlist.
![Welcome page](./src/resources/WelcomePage.PNG?raw=true "[Welcome page")

The income page is the first step in creating a new budget estimate. If you have previously used
the app, you will have the option to use your previous income. If this is your first time, you will
enter in all your income information and proceed to the next page.
![Income page](./src/resources/IncomePage.PNG?raw=true "Income page")

The expenses page is the second step in creating a budget estimate. Here you will add your monthly bills
and other expenses to a list by entering the required information and clicking 'add expense'. 
You will also be able to remove them if you've made a mistake. 
![Expenses page](./src/resources/ExpensesPage.PNG?raw=true "Expenses page")

The wishlist page is the last step before you can view your budget estimate. Here you will provide items you wish to 
purchase, along with the URL you wish to link them to, and the cost of the item. You can add as many as you'd like, and remove them
whenever you please.
![Wishlist page](./src/resources/WishlistPage.PNG?raw=true "Wishlist page")

The summary page is where you can look over your information, view your projected bank account balance, and view the time that it 
will take for you to make purchases on your wishlist. Once you are finished, the 'Done' button will take you back to your welcome page.
![Summary page](./src/resources/SummaryPage.PNG?raw=true "Summary page")