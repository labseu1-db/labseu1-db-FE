import React, { Component } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { StyledForm, StyledInput, StyledLabel } from '../styled-components/StyledLogin';
import { StyledH1 } from '../styled-components/StyledText';
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

import Modal1 from './Modal1';

const ModalExampleMultiple = () => (
  <Modal trigger={<Button>Create organisation</Button>} basic size="tiny">
    <StyledModalH1>
      <Modal.Header content="Create an organisation" />
    </StyledModalH1>
    <StyledModalCard>
      <Modal.Content>
        <StyledModalText>Organisations are the shared home for your team. Use organisations to get a bird's eye view of discussionsand decisions happening across your organisation.</StyledModalText>
        <StyledModalForm>
          <StyledModalLabel>
            Organisation name <span className="ligther-font">(Company, nonprofit, school, team)</span>
          </StyledModalLabel>
          <StyledModalInput name="orgName" type="text" />
        </StyledModalForm>
      </Modal.Content>
      <Modal.Actions>
        <StyledActionButtonsContainer>
          <Modal1 />
          <SDModalMainButtonContainer>
            <StyledModalButton className="cancel-button">Cancel</StyledModalButton>
          </SDModalMainButtonContainer>
        </StyledActionButtonsContainer>
      </Modal.Actions>
    </StyledModalCard>
  </Modal>
);

export default ModalExampleMultiple;

//Stylin
