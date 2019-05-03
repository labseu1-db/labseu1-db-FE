import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import * as style from '../styled-components/StyledModal';

export default class CreateCompanyModal extends Component {
  state = {
    orgName: ''
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Modal open={this.props.shoudlBeOpen} basic size="tiny">
        <style.StyledProgressContainer>
          <style.StyledProgressDot className="active" />
          <style.StyledProgressDot />
          <style.StyledProgressDot />
          <style.StyledProgressDot />
        </style.StyledProgressContainer>
        <style.StyledModalH1>
          <Modal.Header content="Create an organisation" />
        </style.StyledModalH1>
        <style.StyledModalCard>
          <Modal.Content>
            <style.StyledModalText>
              Organisations are the shared home for your team. Use organisations to get a bird's eye view of all discussions and decisions happening across your organisation.
            </style.StyledModalText>
            <style.StyledModalForm>
              <style.StyledModalLabel>
                Organisation name <span className="ligther-font">(Company, nonprofit, school, team)</span>
              </style.StyledModalLabel>
              <style.StyledLableContainer>
                <style.StyledModalInput name="orgName" maxLength="20" type="text" required onChange={this.handleInputChange} value={this.state.orgName} />
                <style.CharacterLeft>{20 - this.state.orgName.length}</style.CharacterLeft>
              </style.StyledLableContainer>
            </style.StyledModalForm>
          </Modal.Content>
          <Modal.Actions>
            <style.StyledActionButtonsContainer>
              <style.StyledModalButton
                disabled={!this.state.orgName.length > 0}
                onClick={e => {
                  e.preventDefault();
                  this.props.showModal('InviteYourTeamModal');
                  this.props.addOrgName(this.state.orgName);
                }}>
                Next
              </style.StyledModalButton>
              <style.SDModalMainButtonContainer>
                <style.StyledModalButton
                  className="cancel-button"
                  onClick={e => {
                    e.preventDefault();
                    this.props.showModal(null);
                  }}>
                  Cancel
                </style.StyledModalButton>
              </style.SDModalMainButtonContainer>
            </style.StyledActionButtonsContainer>
          </Modal.Actions>
        </style.StyledModalCard>
      </Modal>
    );
  }
}

//Stylin
