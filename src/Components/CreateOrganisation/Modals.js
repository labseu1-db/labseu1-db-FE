import React, { Component } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { StyledForm, StyledInput, StyledLabel } from '../styled-components/StyledLogin';
import { StyledH1, StyledPLabel } from '../styled-components/StyledText';
import { StyledModalText, StyledCenteredContainer, StyledModalContainer } from '../styled-components/StyledModal';
import styled from 'styled-components';

class NestedModal extends Component {
  state = { open: false };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open } = this.state;

    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size="large"
        trigger={
          <Button primary icon>
            Proceed <Icon name="right chevron" />
          </Button>
        }>
        <Modal.Header>Modal #2</Modal.Header>
        <Modal.Content>
          <p>That's everything!</p>
        </Modal.Content>
        <Modal.Actions>
          <Button icon="check" content="All Done" onClick={this.close} />
        </Modal.Actions>
      </Modal>
    );
  }
}

const ModalExampleMultiple = () => (
  <StyledModalContainer>
    <Modal trigger={<Button>Create organisation</Button>} basic size="tiny">
      <StyledCenteredContainer>
        <StyledH1>
          <Modal.Header content="Create an organisation" />
        </StyledH1>
      </StyledCenteredContainer>
      <Modal.Content>
        <StyledModalText>Organisations are the shared home for your team. Use organisations to get a bird's eye view of discussionsand decisions happening across your organisation.</StyledModalText>
        <StyledForm>
          <StyledLabel>
            <StyledPLabel>
              Organisation name <span>(Company, nonprofit, school, team)</span>
            </StyledPLabel>
            <StyledInput name="orgName" type="text" />
          </StyledLabel>
        </StyledForm>
      </Modal.Content>
      <Modal.Actions>
        <NestedModal />
      </Modal.Actions>
    </Modal>
  </StyledModalContainer>
);

export default ModalExampleMultiple;

//Stylin
