import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import * as style from '../styled-components/StyledModal';

export default class InviteYourTeamModal extends Component {
  state = { open: false, inputs: [this.props.teamEmailAddress[0], this.props.teamEmailAddress[1], this.props.teamEmailAddress[2], this.props.teamEmailAddress[3]] };

  appendInput = () => {
    this.setState(prevState => ({ inputs: prevState.inputs.concat(['']) }));
  };

  addEmail = (email, index) => {
    this.setState(pr => ({
      inputs: pr.inputs.map((value, i) => {
        if (i === index) {
          return email;
        }
        return value;
      })
    }));
  };

  render() {
    return (
      <Modal open={this.props.shoudlBeOpen} basic size="tiny">
        <style.StyledProgressContainer>
          <style.StyledProgressDot className="active" />
          <style.StyledProgressDot className="active" />
          <style.StyledProgressDot />
        </style.StyledProgressContainer>
        <style.StyledModalH1>
          <Modal.Header content="Invite your team" />
        </style.StyledModalH1>
        <style.StyledModalCard>
          <Modal.Content>
            <style.StyledModalForm>
              <style.StyledModalLabel className="heading">Email addresses</style.StyledModalLabel>
              <div id="dynamicInput">
                {this.state.inputs.map((input, i) => (
                  <style.StyledModalInput
                    placeholder="Email address"
                    value={this.state.inputs[i]}
                    onChange={e => {
                      this.addEmail(e.target.value, i);
                    }}
                    key={i}
                  />
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
                  this.props.addTeamEmailAddress(this.state.inputs);
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
