import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import * as style from '../styled-components/StyledModal';

//Import components
import ProgressBar from '../reusable-components/ProgressBar';

export default class InviteYourTeamModal extends Component {
  //Start with 4 inputs
  state = { open: false, inputs: [this.props.teamEmailAddress[0], this.props.teamEmailAddress[1], this.props.teamEmailAddress[2], this.props.teamEmailAddress[3]] };

  //Add email input when clicked on email
  appendInput = () => {
    this.setState(prevState => ({ inputs: prevState.inputs.concat(['']) }));
  };

  //Add email to state
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

  //Render component
  render() {
    return (
      <Modal open={this.props.shoudlBeOpen} basic size="tiny">
        <ProgressBar activeDots={2} bulletpoints={3} />
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
              <style.StyledModalMainButtonContainer>
                <style.StyledModalButton
                  className="cancel-button"
                  onClick={e => {
                    e.preventDefault();
                    this.props.showModal('CreateSpacesModal');
                  }}>
                  Skip
                </style.StyledModalButton>
              </style.StyledModalMainButtonContainer>
            </style.StyledActionButtonsContainer>
          </Modal.Actions>
        </style.StyledModalCard>
      </Modal>
    );
  }
}
