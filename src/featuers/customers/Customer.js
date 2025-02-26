import { useSelector } from "react-redux";

function Customer() {
//* useSelector is used to create subscription to the store whenever the store is changes this component will re-render
  const customer  =  useSelector((store) => store.customer.fullName)
  console.log(customer)
  return <h2>👋 Welcome, {customer.name}</h2>;
}

export default Customer;

