import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import userServices from '../services/userServices';

function CheckoutForm({ roomId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      setError(result.error.message);
    } else {
      try {
        const response = await userServices.processPayment(result.token.id, roomId);
        if (response.status === 200) {
          setSuccess('Payment successful!');
          // Optionally update room status or navigate
        } else {
          setError('Payment failed');
        }
      } catch (error) {
        setError('Payment failed');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay</button>
      {error && <div>{error}</div>}
      {success && <div>{success}</div>}
    </form>
  );
}

export default CheckoutForm;