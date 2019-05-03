import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import * as style from '../styled-components/StyledModal';

export default class CreateSpacesModal extends Component {
  spacesExamples = [
    { name: 'Product', color: 'eggplant' },
    { name: 'Engineering', color: 'darkgreen' },
    { name: 'Recruiting', color: 'violet' },
    { name: 'Design', color: 'darkolive' },
    { name: 'Marketing', color: 'yellow' },
    { name: 'Reviews', color: 'red' },
    { name: 'Announcements', color: 'lightblue' },
    { name: 'Research', color: 'green' }
  ];

  state = {
    chosenSpaces: []
  };

  addSpace = space => {
    this.setState(pr => ({
      chosenSpaces: [...pr.chosenSpaces, space]
    }));
  };

  render() {
    return (
      <Modal open={this.props.shoudlBeOpen} basic size="tiny">
        <style.StyledProgressContainer>
          <style.StyledProgressDot className="active" />
          <style.StyledProgressDot className="active" />
          <style.StyledProgressDot className="active" />
          <style.StyledProgressDot />
        </style.StyledProgressContainer>
        <style.StyledModalH1>
          <Modal.Header content="Create few spaces" />
        </style.StyledModalH1>
        <style.StyledModalCard>
          <Modal.Content>
            <style.StyledModalForm>
              <style.StyledModalLabel>Set up spaces for your team</style.StyledModalLabel>
              <style.StyledModalTextInForm>Spaces are your team's virtual meeting rooms. Use them to have discussions about specific projects and broader team topics.</style.StyledModalTextInForm>
              <style.StyledModalLabel>
                Choose a few spaces <span>{`${this.state.chosenSpaces.length} selected`}</span>
              </style.StyledModalLabel>
              <style.StyledModalSpacesContainer>
                {this.spacesExamples.map(s => {
                  return (
                    <style.StyledSpacesModalCard className={s.color} key={s.name} onClick={() => this.addSpace(s.name)}>
                      {s.name}
                    </style.StyledSpacesModalCard>
                  );
                })}
              </style.StyledModalSpacesContainer>
              <style.StyledModalLabel>Create a few spaces</style.StyledModalLabel>
              <style.StyledModalTextInForm>Start with current projects, ongoning discussion topics, or anything else you would have a meeting about.</style.StyledModalTextInForm>
              <style.StyledModalInput placeholder="ie. Products Proposals" />
              <style.StyledModalInput placeholder="ie. Design Review" />
            </style.StyledModalForm>
          </Modal.Content>
          <Modal.Actions>
            <style.StyledActionButtonsContainer>
              <style.StyledModalButton
                onClick={e => {
                  e.preventDefault();
                  this.props.showModal('null');
                }}>
                Finish
              </style.StyledModalButton>
              <style.SDModalMainButtonContainer>
                <style.StyledModalButton
                  className="cancel-button"
                  onClick={e => {
                    e.preventDefault();
                    this.props.showModal('InviteYourTeamModal');
                  }}>
                  Back
                </style.StyledModalButton>
              </style.SDModalMainButtonContainer>
            </style.StyledActionButtonsContainer>
          </Modal.Actions>
        </style.StyledModalCard>
      </Modal>
    );
  }
}
