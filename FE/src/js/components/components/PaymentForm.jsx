import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  CardElement
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_51My2lUGtwtMhoEnmkA0WErIjrSdnx5VKfkKmtmS477aAaLdyLGXnHZln9RfvgEjGKAGwhCshCoOPSC9Y4nKzc1tX004z25VLQG");

export default function CheckoutForm({onSuccess, clientSecret}) {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          email: email,
        },
      },
    });
    if (result.error) {
      console.error(result.error.message);
    } else {
      onSuccess(result);
      // Payment is complete, send receipt email or perform other actions on the server
    }
    // Payment is successful, call onSuccess with the payment intent ID
  };
  

  const paymentElementOptions = {
    layout: "tabs"
  }
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        value={email}
        onChange={(e) => setEmail(e.value.email)}
      />
      <CardElement options={paymentElementOptions} onChange={() => setMessage("got it")} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {/* {message && <div id="payment-message">{message}</div>} */}
    </form>
  );
}