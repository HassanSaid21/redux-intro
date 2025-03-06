import { createSlice } from "@reduxjs/toolkit";
// this function gives us 3 things
//1-)automatically create action creators  from our reducers
//-2) it makes writing reducers a lot  easier  because we no longer need that switch statement
// and also default case is automatically handled
//-3) we can also mutate states inside reducers

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      if (state.balance < action.payload) return;
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan += action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    }, 
    payLoan(state, action) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state, action) {
      state.isLoading = true;
    },
  },
});
console.log(accountSlice);

export const { payLoan, requestLoan, withdraw } = accountSlice.actions;
export default accountSlice.reducer;

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  // when we return  a function instead of an object  redux knows that this function is thunk middleware
  //  and it will execute that function before dispatch the action to the store
  // and then redux knows that this function is asynchronous action that we want to execute before dispatching anything
  // to the store
  // this function has an access to the dispatch function and the current state  by calling getStata function

  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    //API calls
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );

    const data = await res.json();
    const convertedData = data.rates["USD"];

    // return action
    dispatch({ type: "account/deposit", payload: convertedData });
  };
}

/*
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/convertingCurrency":
      return { ...state, isLoading: true };
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      // LATER
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  // when we return a function instead of an object  redux knows that this function is thunk middleware
  //  and it will execute that function before dispatch the action to the store
  // and then redux knows that this function is asynchronous action that we want to execute before dispatching anything
  // to the store
  // this function has an access to the dispatch function and the current state  by calling getStata function

  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    //API calls
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );

    const data = await res.json();
    const convertedData = data.rates["USD"];

    // return action
    dispatch({ type: "account/deposit", payload: convertedData });
  };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
*/
