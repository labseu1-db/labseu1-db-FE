import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';

//Import stylesheet
import * as style from '../styled-components/StyledModal';

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
