import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';

class CheckoutFormContainer extends Component {
  state = {
    model_open: false
  };

  handleOpen = () => {
    this.setState({ model_open: true });
  };

  handleClose = () => {
    this.setState({ model_open: false });
  };

  render() {
    return (
      <Modal
        trigger={
          <div>
            <UpgradePlanButton onClick={this.handleOpen}>
              <div>Upgrade Plan</div>
            </UpgradePlanButton>
          </div>
        }
        open={this.state.model_open}
        size="tiny"
      >
        <StripeProvider apiKey="pk_test_pigHFNnI4QzYmyhZNos15gSO00D4tYq8B3">
          <div className="example">
            {/* <h1>Please enter your payment details</h1> */}
            <Elements>
              <CheckoutForm handleClose={this.handleClose} />
            </Elements>
          </div>
        </StripeProvider>
      </Modal>
    );
  }
}

export default CheckoutFormContainer;

const UpgradePlanButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 6px 15px;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  background-color: #5c4df2;
  color: white;
  border: none;
  &:focus {
    outline: none;
  }
  img {
    width: 1.1rem;
    margin-right: 5px;
  }
`;
