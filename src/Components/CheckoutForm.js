import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import styled from 'styled-components';
import { Modal } from 'semantic-ui-react';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { paymentEndPoint } from '../firebase/firebaseConfig';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }

  async submit(e) {
    e.preventDefault();
    // User clicked submit
    let { token } = await this.props.stripe.createToken({ name: 'Name' });
    if (!token) {
      window.alert('Invalid payment details');
    } else {
      let response = await fetch(paymentEndPoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: token.id
      });

      if (response.ok) {
        this.setState({ complete: true });
      } else {
        window.alert('Error processing payment');
        this.props.handleClose();
      }
    }
  }

  completeUpgrade = () => {
    this.props.firestore.update(
      { collection: 'organisations', doc: this.props.currentOrg.id },
      {
        isPremium: true
      }
    );
    this.props.handleClose();
  };

  render() {
    if (this.state.complete) {
      return (
        <div>
          <StyledModalH1>
            <Modal.Header content="Purchase Complete" />
          </StyledModalH1>

          <StyledModalMainButtonContainerOk>
            <StyledModalButtonUpgrade onClick={this.completeUpgrade}>Upgrade Account</StyledModalButtonUpgrade>
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

          <form onSubmit={this.submit}>
            <CardElementContainer>
              <CardElement style={{ base: { fontSize: '18px' } }} />
            </CardElementContainer>
          </form>

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

const mapStateToProps = state => {
  return {};
};

//As we are not dispatching anything - this is empty
const mapDispatchToProps = {};

export default compose(
  withFirestore,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect()
)(injectStripe(CheckoutForm));

// export default injectStripe(CheckoutForm);

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
  background-color: #00bc98;
`;

const StyledModalButtonUpgrade = styled.button`
  width: 150px;
  padding: 5px 15px;
  margin: 0 0 25px 0;
  color: white;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  background-color: #00bc98;
`;

const StyledModalMainButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  .cancel-button {
    color: #00bc98;
    background-color: white;
    border: 2px solid #00bc98;
  }
`;

const StyledModalMainButtonContainerOk = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
  .cancel-button {
    color: #00bc98;
    background-color: white;
    border: 2px solid #00bc98;
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
  padding-right: 50px;
  padding-bottom: 40px;
`;
