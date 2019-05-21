import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';

//Import components
import ProgressBar from '../reusable-components/ProgressBar';

//Main component - Modal
export default class CreateCompanyModal extends Component {
  state = {
    orgName: ''
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //Render component
  render() {
    return (
      <Modal open={this.props.shoudlBeOpen} basic size="tiny">
        <ProgressBar activeDots={1} bulletpoints={3} />
        <StyledModalH1>
          <Modal.Header content="Create an organisation" />
        </StyledModalH1>
        <StyledModalCard>
          <Modal.Content>
            <StyledModalText>
              Organisations are the shared home for your team. Use organisations to get a bird's eye view of all
              discussions and decisions happening across your organisation.
            </StyledModalText>
            <StyledModalForm>
              <StyledModalLabel>
                Organisation name <span className="ligther-font">(Company, nonprofit, school, team)</span>
              </StyledModalLabel>
              <StyledLableContainer>
                <StyledModalInput
                  name="orgName"
                  maxLength="20"
                  type="text"
                  required
                  onChange={this.handleInputChange}
                  value={this.state.orgName}
                />
                <CharacterLeft>{20 - this.state.orgName.length}</CharacterLeft>
              </StyledLableContainer>
            </StyledModalForm>
          </Modal.Content>
          <Modal.Actions>
            <StyledActionButtonsContainer>
              <StyledModalButton
                disabled={!this.state.orgName.length > 0}
                onClick={e => {
                  e.preventDefault();
                  this.props.showModal('InviteYourTeamModal');
                  this.props.addOrgName(this.state.orgName);
                }}>
                Next
              </StyledModalButton>
              <StyledModalMainButtonContainer>
                <StyledModalButton
                  className="cancel-button"
                  onClick={e => {
                    e.preventDefault();
                    this.props.showModal(null);
                    this.props.props.history.push('/homescreen');
                  }}>
                  Cancel
                </StyledModalButton>
              </StyledModalMainButtonContainer>
            </StyledActionButtonsContainer>
          </Modal.Actions>
        </StyledModalCard>
      </Modal>
    );
  }
}

const StyledModalH1 = styled.h1`
  font-family: 'Open Sans', sans-serif;
  text-align: center;
  font-weight: 300;
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
  padding: 25px;
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

const StyledLableContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledModalInput = styled.input`
  width: 98%;
  border: none;
  border-bottom: 2px solid #bdc3c9;
  padding: 10px 0 5px 0;
  margin-bottom: 10px;
  &::placeholder {
    font-size: 1.2rem;
  }
`;

const CharacterLeft = styled.div`
  width: 2%;
  padding-left: 3px;
  font-size: 0.8rem;
  font-weight: 700;
  color: #bdc3c9;
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
