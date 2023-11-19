import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CALCULATE_TOTAL_AMOUNT, CALCULATE_TOTAL_QUANTITY, selectCartItems, selectCartTotalAmount } from '../../redux/slice/cartSlice';
import { selectBillingAddress, selectShippingAddress } from '../../redux/slice/checkoutSlice';
import { selectEmail } from '../../redux/slice/authSlice';
import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import CheckoutForm from '../../components/checkoutForm/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Checkout = () => {

  const [message, setMessage] = useState("Initializing checkout");
  const [clientSecret, setClientSecret] = useState("");

  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const customerEmail = useSelector(selectEmail)
  const billingAddress = useSelector(selectBillingAddress)
  const shippingAddress = useSelector(selectShippingAddress)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY())
    dispatch(CALCULATE_TOTAL_AMOUNT())
  },[dispatch, cartItems])

  const description = `eshop payment : email: ${customerEmail}, Amount: ${cartTotalAmount}`

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        items: cartItems, 
        userEmail : customerEmail,
        shipping : shippingAddress,
        billing : billingAddress,
        description }),  //send somthing to the backend
                         //the amount should be calculated in the bakend so it can not be manipulated
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.json().then((json) => Promise.reject(json));
    })
    .then((data) => {
      setClientSecret(data.clientSecret);
    })
    .catch((error) => {
      setMessage("Failed to initialize checkout");
      toast.error("Something went wrong!!!");
    });
}, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <section>
        <div className="container">{!clientSecret && <h3>{message}</h3>}</div>
      </section>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Checkout