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
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';

const stripePromise = loadStripe("pk_test_51My2lUGtwtMhoEnmkA0WErIjrSdnx5VKfkKmtmS477aAaLdyLGXnHZln9RfvgEjGKAGwhCshCoOPSC9Y4nKzc1tX004z25VLQG");

export default function CheckoutForm({onSuccess, clientSecret, handleClose, }) {
  const stripe = useStripe();
  const elements = useElements();
  const name = JSON?.parse(localStorage?.getItem('user-token'))?.name;
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
console.log(clientSecret);
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
    // const result = await stripe.confirmCardPayment(clientSecret, {
    //   payment_method: {
    //     type: 'card',
    //     card: elements.getElement(CardElement),
    //     billing_details: {
    //       email: email,
    //     },
    //   },
    // });
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name,
          email,
        },
      },
    });
    if (result.error) {
      toast(result.error.message)
      console.error(result.error.message);
    } else {
      toast('The ammount '+result.paymentIntent?.amount+' was send successfully')
      console.log(result);
      handleClose()
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
     {email?<> <CardElement
            id='card-element'
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
     <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        {console.log(isLoading , !stripe , !elements)}
        <Button variant='primary' disabled={isLoading || !stripe || !elements} type="submit">
        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </Button>
      </Modal.Footer></>:null}
      {/* Show any error or success messages */}
      {/* {message && <div id="payment-message">{message}</div>} */}
    </form>
  );
}