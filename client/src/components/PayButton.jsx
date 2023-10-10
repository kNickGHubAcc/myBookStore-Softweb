import axios from "axios";
import {useSelector} from "react-redux";
import {url} from "../slices/api";


const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth);

  const handleCheckout = () => {
    axios.post(`${url}/stripe/create-checkout-session`, {       //Αποστολή POST request στο Stripe με τα δεδομένα της παραγγελίας μας
        cartItems,
        userId: user._id,
    })
    .then((response) => {
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    })
    .catch((err) => console.log(err.message));
  };

  return (
    <button onClick={() => handleCheckout()}>Checkout</button>
  );
};


export default PayButton;