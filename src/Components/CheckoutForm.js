import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    // User clicked submit
    let { token } = await this.props.stripe.createToken({ name: 'Name' });
    console.log(token);
    let response = await fetch('http://localhost:9000/charge', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: token.id
    });

    if (response.ok) {
      this.setState({ complete: true });
      console.log('response:', response);
    } else {
      console.log('response:', response);
    }
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <div className="checkout">
        <h2>Please enter your card details below</h2>
        <CardElement />
        <button onClick={this.submit}>Pay now</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
