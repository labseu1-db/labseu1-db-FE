import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import * as style from '../styled-components/StyledModal';

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
        <style.StyledProgressContainer>
          <style.StyledProgressDot className="active" />
          <style.StyledProgressDot className="active" />
          <style.StyledProgressDot />
          <style.StyledProgressDot />
        </style.StyledProgressContainer>
        <style.StyledModalH1>
          <Modal.Header content="Invite your team" />
        </style.StyledModalH1>
        <style.StyledModalCard>
          <Modal.Content>
            <style.StyledModalForm>
              <style.StyledModalLabel className="email-heading">Email addresses</style.StyledModalLabel>
              <style.StyledModalInput placeholder="Email address" />
              <style.StyledModalInput placeholder="Email address" />
              <style.StyledModalInput placeholder="Email address" />
              <div id="dynamicInput">
                {this.state.inputs.map(input => (
                  <style.StyledModalInput placeholder="Email address" key={input} />
                ))}
              </div>
            </style.StyledModalForm>
            <style.StyledModalAdder onClick={() => this.appendInput()}>Add more emails</style.StyledModalAdder>
          </Modal.Content>
          <Modal.Actions>
            <style.StyledActionButtonsContainer>
              <style.StyledModalButton
                onClick={e => {
                  e.preventDefault();
                  this.props.showModal('CreateSpacesModal');
                }}>
                Next
              </style.StyledModalButton>
              <style.SDModalMainButtonContainer>
                <style.StyledModalButton
                  className="cancel-button"
                  onClick={e => {
                    e.preventDefault();
                    this.props.showModal('CreateSpacesModal');
                  }}>
                  Skip
                </style.StyledModalButton>
              </style.SDModalMainButtonContainer>
            </style.StyledActionButtonsContainer>
          </Modal.Actions>
        </style.StyledModalCard>
      </Modal>
    );
  }
}
