import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

class CheckoutFormContainer extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_pigHFNnI4QzYmyhZNos15gSO00D4tYq8B3x">
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default CheckoutFormContainer;
