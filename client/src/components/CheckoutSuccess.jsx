import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { clearCart, getTotals } from "../slices/cartSlice";


const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);


  useEffect(() => {           //Άδειασμα του cart μετά το checkout και ενημέρωση του state
    dispatch(clearCart());
  }, [dispatch]);

  useEffect(() => {           //Ανάκτηση των συνολικών ποσών μετά το checkout και ενημέρωση του state
    dispatch(getTotals());
  }, [cart, dispatch]);
  

  return (
    <Container>
      <h2>Checkout completed successfully !</h2>
      <p>Your order might take some time to process.</p>
      <p>You can leave the page.</p>
    </Container>
  );
};


const Container = styled.div`
  min-height: 70vh;
  max-width: 800px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  h2 {
    margin-bottom: 0.5rem;
    color: #029e02;
    font-weight: 900;
    font-size: 35px;
  }
`;


export default CheckoutSuccess;