import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "./featuers/accounts/accountSlice";
import customerReducer from "./featuers/customers/customerSlice";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// this is how we tell our store that we want to use the middleware thunk in our application
export const store = createStore(rootReducer, applyMiddleware(thunk));

//* note that redux is smart enough to know which reducer  to set this action to it
// store.dispatch(deposit(500));
// store.dispatch(withdraw(200));
// console.log(store.getState());

// store.dispatch(requestLoan(1000, "Buy a cheap car"));
// console.log(store.getState());
// store.dispatch(payLoan());
// store.dispatch(createCustomer("karim said ", "24343434"));
// console.log(store.getState());
