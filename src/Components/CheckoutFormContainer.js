import React, { useState } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';

const CheckoutFormContainer = props => {
  // state = {
  //   model_open: false
  // };

  const [model, setModel] = useState(false);

  const handleOpen = () => {
    setModel(true);
  };

  const handleClose = () => {
    setModel(false);
  };

  return (
    <Modal
      trigger={
        <div>
          <UpgradePlanButton onClick={handleOpen}>
            <div>Upgrade Plan</div>
          </UpgradePlanButton>
        </div>
      }
      open={model}
      size="tiny"
    >
      <StripeProvider apiKey="pk_test_pigHFNnI4QzYmyhZNos15gSO00D4tYq8B3">
        <div className="example">
          <Elements>
            <CheckoutForm
              handleClose={handleClose}
              currentOrg={props.currentOrg}
            />
          </Elements>
        </div>
      </StripeProvider>
    </Modal>
  );
};

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
  background-color: #00bc98;
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
