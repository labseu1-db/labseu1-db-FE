import React, { Component } from 'react';
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  injectStripe
} from 'react-stripe-elements';
import styled from 'styled-components';
import { Modal } from 'semantic-ui-react';

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
    if (this.state.complete) {
      return (
        <div>
          <StyledModalH1>
            <Modal.Header content="Purchase Complete" />
          </StyledModalH1>

          <StyledModalMainButtonContainerOk>
            <StyledModalButton onClick={this.props.handleClose}>OK</StyledModalButton>
          </StyledModalMainButtonContainerOk>
        </div>
      );
    }
    return (
      <div className="checkout">
        <StyledModalH1>
          <Modal.Header content="Confirm your purchase" />
        </StyledModalH1>
        <StyledModalCard>
          <Modal.Content>
            <StyledModalText>
              If you wish to upgrade your account please make a one off payment of $20. This is non-refundable and will
              appear on your bank statement as sailor co.
            </StyledModalText>
            <StyledModalForm>
              <StyledModalLabel>
                Please enter your card details below{' '}
                <span className="ligther-font">(Card number, expiry date and CVC)</span>
              </StyledModalLabel>
            </StyledModalForm>
          </Modal.Content>
          <CardElementContainer>
            <CardElement />
            {/* <form onSubmit={this.submit}>
              <label>
                Card number
                <CardNumberElement />
              </label>
              <label>
                Expiration date
                <CardExpiryElement />
              </label>
              <label>
                CVC
                <CardCVCElement />
              </label>
              <label>
                Postal code
                <PostalCodeElement />
              </label>
            </form> */}
          </CardElementContainer>
          <Modal.Actions>
            <StyledActionButtonsContainer>
              <StyledModalButton onClick={this.submit}>Pay now</StyledModalButton>

              <StyledModalMainButtonContainer>
                <StyledModalButton className="cancel-button" onClick={this.props.handleClose}>
                  Cancel
                </StyledModalButton>
              </StyledModalMainButtonContainer>
            </StyledActionButtonsContainer>
          </Modal.Actions>
        </StyledModalCard>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);

const StyledModalH1 = styled.h1`
  padding-top: 40px;
  font-family: 'Open Sans', sans-serif;
  text-align: center;
  font-weight: 300;
`;

const StyledModalButton = styled.button`
  width: 100px;
  padding: 5px 15px;
  margin: 0 25px 25px 0;
  color: white;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  background-color: #5c4df2;
`;

const StyledModalMainButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  .cancel-button {
    color: #5c4df2;
    background-color: white;
    border: 2px solid #5c4df2;
  }
`;

const StyledModalMainButtonContainerOk = styled.div`
  display: flex;
  justify-content: center;
  .cancel-button {
    color: #5c4df2;
    background-color: white;
    border: 2px solid #5c4df2;
  }
`;

const StyledActionButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row-reverse;
`;

const StyledModalCard = styled.div`
  background-color: white;
  margin-top: 50px;
  border-radius: 5px;
  input:focus,
  button:focus,
  textarea:focus {
    outline: none;
  }
`;

const StyledModalText = styled.div`
  line-height: 1.6;
  padding-left: 25px;
  padding-right: 25px;
  color: black;
`;

const StyledModalForm = styled.form`
  padding: 25px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 20px;
  .heading {
    padding-bottom: 40px;
  }
`;

const StyledModalLabel = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  padding-bottom: 10px;
  color: black;
  .ligther-font {
    font-size: 0.8rem;
    color: #bdc3c9;
  }
`;

const CardElementContainer = styled.div`
  padding-left: 25px;
  padding-right: 167px;
  /* padding-top: 40px; */
  padding-bottom: 40px;
`;
