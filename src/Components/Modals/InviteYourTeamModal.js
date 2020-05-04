import React, { useState } from 'react';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';

//Import semantic components
import { Message } from 'semantic-ui-react';

//Import components
import ProgressBar from '../reusable-components/ProgressBar';

const InviteYourTeamModal = props => {
  //Start with 4 inputs
  // state = {
  //   open: false,
  //   inputs: [
  //     props.teamEmailAddress[0],
  //     props.teamEmailAddress[1],
  //     props.teamEmailAddress[2],
  //     props.teamEmailAddress[3]
  //   ],
  //   alert: false
  // };

  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState([
    props.teamEmailAddress[0],
    props.teamEmailAddress[1],
    props.teamEmailAddress[2],
    props.teamEmailAddress[3]
  ]);
  const [alert, setAlert] = useState(false);

  //Add email input when clicked on email
  const appendInput = () => {
    setInputs(prevState => prevState.inputs.concat(['']));
  };

  //Add email to state
  const addEmail = (email, index) => {
    setInputs(pr =>
      pr.map((value, i) => {
        if (i === index) {
          return email;
        }
        return value;
      })
    );
  };

  const checkIfEmail = email => {
    let re = /(^$|^.*@.*\..*$)/;
    return re.test(email);
  };

  //Render component
  return (
    <Modal open={props.shoudlBeOpen} basic size="tiny">
      <ProgressBar activeDots={2} bulletpoints={3} />
      <StyledModalH1>
        <Modal.Header content="Invite your team" />
      </StyledModalH1>
      <StyledModalCard>
        <Modal.Content>
          <StyledModalForm>
            <StyledModalLabel className="heading">
              Email addresses
            </StyledModalLabel>
            <div id="dynamicInput">
              {inputs.map((input, i) => (
                <StyledModalInput
                  placeholder="Email address"
                  type="email"
                  value={inputs[i]}
                  onChange={e => {
                    addEmail(e.target.value, i);
                  }}
                  key={i}
                />
              ))}
            </div>
          </StyledModalForm>
          <StyledModalAdder onClick={() => appendInput()}>
            Add more emails
          </StyledModalAdder>
        </Modal.Content>
        <Modal.Actions>
          <StyledActionButtonsContainer>
            <StyledModalButton
              onClick={e => {
                e.preventDefault();
                setAlert(false);
                if (inputs.every(checkIfEmail)) {
                  props.addTeamEmailAddress(inputs);
                  props.showModal('CreateSpacesModal');
                } else {
                  setAlert(true);
                }
              }}
            >
              Next
            </StyledModalButton>
            <StyledModalMainButtonContainer>
              <StyledModalButton
                className="cancel-button"
                onClick={e => {
                  e.preventDefault();
                  props.showModal('CreateSpacesModal');
                }}
              >
                Skip
              </StyledModalButton>
            </StyledModalMainButtonContainer>
          </StyledActionButtonsContainer>
        </Modal.Actions>
      </StyledModalCard>

      {alert && (
        <StyledAlertMessage>
          <Message color="red">
            Please make sure that you are using valid email address.
          </Message>
        </StyledAlertMessage>
      )}
    </Modal>
  );
};

export default InviteYourTeamModal;

const StyledModalH1 = styled.h1`
  font-family: 'Open Sans', sans-serif;
  text-align: center;
  font-weight: 300;
`;

const StyledModalCard = styled.div`
  background-color: white;
  margin-top: 50px;
  border-radius: 5px;
`;

const StyledAlertMessage = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
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

const StyledModalInput = styled.input`
  width: 98%;
  border: none;
  border-bottom: 2px solid #bdc3c9;
  padding: 10px 0 5px 0;
  margin-bottom: 10px;
  &:focus {
    border-bottom: 2px solid #00bc98;
  }
  &::placeholder {
    font-size: 1rem;
  }
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

const StyledActionButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row-reverse;
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

const StyledModalAdder = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #00bc98;
  padding: 0 25px;
  cursor: pointer;
`;
