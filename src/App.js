import CreateCustomer from "./featuers/customers/CreateCustomer";
import Customer from "./featuers/customers/Customer";
import AccountOperations from "./featuers/accounts/AccountOperations";
import BalanceDisplay from "./featuers/accounts/BalanceDisplay";

function App() {
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      <CreateCustomer />
      <Customer />
      <AccountOperations />
      <BalanceDisplay />
    </div>
  );
}

export default App;
