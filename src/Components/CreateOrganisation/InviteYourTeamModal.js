import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import {
  StyledModalText,
  StyledModalH1,
  StyledModalCard,
  StyledModalForm,
  StyledModalLabel,
  StyledModalInput,
  StyledModalButton,
  StyledModalAdder,
  SDModalMainButtonContainer,
  StyledActionButtonsContainer,
  StyledProgressContainer,
  StyledProgressDot,
  StyledModalContainer,
  StyledModalEnvContainer
} from '../styled-components/StyledModal';

import CreateSpacesModal from './CreateSpacesModal';

export default class InviteYourTeamModal extends Component {
  state = { open: false, inputs: ['input-0'] };

  appendInput = () => {
    let newInput = `input-${this.state.inputs.length}`;
    this.setState(prevState => ({ inputs: prevState.inputs.concat([newInput]) }));
  };
  render() {
    return (
      <Modal closeOnEscape={true} open={this.props.shoudlBeOpen} basic size="tiny">
        <StyledProgressContainer>
          <StyledProgressDot className="active" />
          <StyledProgressDot className="active" />
          <StyledProgressDot />
          <StyledProgressDot />
        </StyledProgressContainer>
        <StyledModalH1>
          <Modal.Header content="Invite your team" />
        </StyledModalH1>
        <StyledModalCard>
          <Modal.Content>
            <StyledModalForm>
              <StyledModalLabel className="email-heading">Email addresses</StyledModalLabel>
              <StyledModalInput placeholder="Email address" />
              <StyledModalInput placeholder="Email address" />
              <StyledModalInput placeholder="Email address" />
              <div id="dynamicInput">
                {this.state.inputs.map(input => (
                  <StyledModalInput placeholder="Email address" key={input} />
                ))}
              </div>
            </StyledModalForm>
            <StyledModalAdder onClick={() => this.appendInput()}>Add more emails</StyledModalAdder>
          </Modal.Content>
          <Modal.Actions>
            <StyledActionButtonsContainer>
              <CreateSpacesModal />
              <SDModalMainButtonContainer>
                <StyledModalButton className="cancel-button" onClick={this.close}>
                  Skip
                </StyledModalButton>
              </SDModalMainButtonContainer>
            </StyledActionButtonsContainer>
          </Modal.Actions>
        </StyledModalCard>
      </Modal>
    );
  }
}
