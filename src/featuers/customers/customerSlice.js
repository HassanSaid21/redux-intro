import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerSlice = createSlice(
{
  name:'customer' ,
  initialState,
  reducers:
  {
    createCustomer:{
    prepare( fullName, nationalID){
      return {
        payload : {fullName, nationalID , createdAt:new Date().toISOString()}

      };
    },
    reducer(state, action){
      state.fullName=action.payload.fullName
      state.nationalID= action.payload.nationalID
      state.createdAt = action.payload.createdAt
    }},
    updateName(state, action){
      
        state.fullName=action.payload
      

    


    }
  }
}
)
export const {createCustomer, updateCustomer} = customerSlice.actions
export default customerSlice.reducer

// export default function customerReducer(state = initialStateCustomer, action) {
//   switch (action.type) {
//     //* it is convenient to make the action type in this structure in redux
//     case "customer/createCustomer":
//       return {
//         ...state,
//         //* in redux  the payload is an object
//         fullName: action.payload.fullName,
//         nationalID: action.payload.nationalID,
//         createdAt: action.payload.createdAt,
//       };
//     case "customer/updateName":
//       return { ...state, fullName: action.payload };
//     default:
//       //in redux we return the state in default instead of throw error
//       return state;
//   }
// }

// export function createCustomer(fullName, nationalID) {
//   return {
//     type: "customer/createCustomer",
//     payload: { fullName, nationalID, createdAt: new Date().toISOString() },
//   };
// }

// export function updateName(fullName) {
//   return { type: "customer/updateName", payload: fullName };
// }
