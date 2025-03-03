import { connect } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({balance}) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}


 function mapStateToProps(state) {
  return {
    balance :state.account.balance ,
  }
  
 }
export default connect(mapStateToProps) (BalanceDisplay);
// the connect function take a function as an argument then return a function that take our component as an argument 