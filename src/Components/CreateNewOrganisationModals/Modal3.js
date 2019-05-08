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
  SDModalMainButtonContainer,
  StyledActionButtonsContainer
} from '../styled-components/StyledModal';

export default class Modal3 extends Component {
  state = { open: false };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open } = this.state;

    return (
      <Modal
        open={open}
        basic
        size="tiny"
        onOpen={this.open}
        onClose={this.close}
        trigger={
          <SDModalMainButtonContainer>
            <StyledModalButton>Next</StyledModalButton>
          </SDModalMainButtonContainer>
        }>
        <StyledModalH1>
          <Modal.Header content="Modal3" />
        </StyledModalH1>
        <StyledModalCard>
          <Modal.Content>
            <StyledModalText>
              Organisations are the shared home for your team. Use organisations to get a bird's eye view of discussionsand decisions happening across your organisation.
            </StyledModalText>
            <StyledModalForm>
              <StyledModalLabel>
                Organisation name <span className="ligther-font">(Company, nonprofit, school, team)</span>
              </StyledModalLabel>
              <StyledModalInput name="orgName" type="text" />
            </StyledModalForm>
          </Modal.Content>
          <Modal.Actions>
            <StyledActionButtonsContainer>
              {/* <NestedModal2 /> */}
              <SDModalMainButtonContainer>
                <StyledModalButton className="cancel-button">Cancel</StyledModalButton>
              </SDModalMainButtonContainer>
            </StyledActionButtonsContainer>
          </Modal.Actions>
        </StyledModalCard>
      </Modal>
    );
  }
}
