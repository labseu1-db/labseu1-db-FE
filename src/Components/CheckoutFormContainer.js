import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

class CheckoutFormContainer extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_pigHFNnI4QzYmyhZNos15gSO00D4tYq8B3">
        <div className="example">
          {/* <h1>Please enter your payment details</h1> */}
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default CheckoutFormContainer;
