import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import { Modal, Dropdown } from 'semantic-ui-react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import uuid from 'uuid';
import 'draft-js/dist/Draft.css';
import styled from 'styled-components';

import textCursor from '../../images/icon-cursor-purple.svg';
import boldIcon from '../../images/icon-bold-white.svg';
import codeIcon from '../../images/icon-code-white.svg';
import italicIcon from '../../images/icon-italic-white.svg';
import underlineIcon from '../../images/icon-underline-white.svg';

class CreateThreadModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      threadName: '',
      threadTopic: '',
      spaceId: '',
      threadCreatedByUserName: ''
    };
    this.onChange = editorState => {
      this.setState({ editorState });
    };
    this.focus = () => this.refs.editor.focus();
  }

  componentWillMount() {}

  saveEditorText = () => {
    let rawDraftContentState = convertToRaw(this.state.editorState.getCurrentContent());
    this.setState({ threadTopic: rawDraftContentState.blocks[0].text }, () => this.addNewThread());
  };

  saveSpaceToThread = (e, data) => {
    e.preventDefault();
    const { value } = data;
    this.setState({ spaceId: value });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleMiniMondal = () => {
    let miniModal = document.getElementById('miniModal');
    if (miniModal.style.display === 'none') {
      miniModal.style.display = 'flex';
    } else {
      miniModal.style.display = 'none';
    }
  };

  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  onUnderlineClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  };

  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  };

  onItalicClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  };

  onCodeClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'CODE'));
  };

  threadId = uuid();
  addNewThread = () => {
    this.props.firestore
      .set(
        { collection: 'threads', doc: this.threadId },
        {
          threadName: this.state.threadName,
          threadTopic: this.state.threadTopic,
          threadCreatedByUserId: window.localStorage.getItem('uuid'),
          threadCreatedByUserName: this.props.user.fullName,
          threadCreatedAt: Date.now(),
          spaceId: this.state.spaceId,
          orgId: this.props.activeOrg
        }
      )
      .then(() => this.props.showModal(null))
      .catch(err => console.log(err));
  };
  close = () => this.setState({ open: false });

  render() {
    const { spacesForActiveOrg } = this.props;
    const spaceOptions = spacesForActiveOrg.map((space, index) => ({
      key: index,
      text: space.spaceName,
      value: `${space.id}`
    }));

    return (
      <Modal open={this.props.shoudlBeOpen} size="small">
        <MiniModalLeft id="miniModal">
          <StyledContainerTitles>Text Styling</StyledContainerTitles>
          <TextStylingContainer>
            <TextStylingButtons onClick={this.onBoldClick}>
              <TextStylingIcon src={boldIcon} alt="bold" />
              <p>Bold</p>
            </TextStylingButtons>
            <TextStylingButtons onClick={this.onItalicClick}>
              <TextStylingIcon src={italicIcon} alt="italic" />
              <p>Italic</p>
            </TextStylingButtons>
            <TextStylingButtons onClick={this.onUnderlineClick}>
              <TextStylingIcon src={underlineIcon} alt="underline" />
              <p>Underline</p>
            </TextStylingButtons>
            <TextStylingButtons onClick={this.onCodeClick}>
              <TextStylingIcon src={codeIcon} alt="code" />
              <p>Code</p>
            </TextStylingButtons>
          </TextStylingContainer>
        </MiniModalLeft>
        <MiniModalRight>
          <Dropdown
            placeholder="Add a Space"
            fluid
            search
            selection
            options={spaceOptions}
            basic={true}
            onChange={this.saveSpaceToThread}
          />
        </MiniModalRight>
        <Modal.Content>
          <StyledInputsContainer>
            <StyledTitleInput
              name="threadName"
              type="text"
              placeholder="Create a title"
              required
              onChange={this.handleInputChange}
            />
            <StyledThreadInput onClick={this.focus}>
              <Editor
                name="threadTopic"
                type="text"
                placeholder="What would you like to discuss with your teammates?"
                required
                onChange={this.onChange}
                editorState={this.state.editorState}
                handleKeyCommand={this.handleKeyCommand}
                ref="editor"
              />
            </StyledThreadInput>
          </StyledInputsContainer>
        </Modal.Content>

        <Modal.Actions>
          <StyledActions>
            <StyledIconButton onClick={this.toggleMiniMondal}>
              <CursonImg src={textCursor} alt="cursor" />
            </StyledIconButton>
            <div>
              <StyledBackButton
                onClick={e => {
                  e.preventDefault();
                  this.props.showModal(null);
                }}
              >
                Back
              </StyledBackButton>
              <StyledButton
                disabled={!this.state.threadName.length > 0 || !this.state.spaceId.length > 0}
                onClick={() => {
                  this.saveEditorText();
                }}
              >
                Post
              </StyledButton>
            </div>
          </StyledActions>
        </Modal.Actions>
      </Modal>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    activeModal: state.modal.activeModal,
    spacesForActiveOrg: state.firestore.ordered.spacesUserIsIn ? state.firestore.ordered.spacesUserIsIn : [],
    user: state.firestore.ordered.users ? state.firestore.ordered.users[0] : [],
    activeOrg: localStorage.getItem('activeOrg') ? localStorage.getItem('activeOrg') : '',
    uuid: localStorage.getItem('uuid') ? localStorage.getItem('uuid') : ''
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearFirestore: () => dispatch({ type: '@@reduxFirestore/CLEAR_DATA' })
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    return [
      {
        collection: 'spaces',
        where: [['arrayOfUserIdsInSpace', '==', props.uuid], ['orgId', '==', props.activeOrg]],
        storeAs: 'spacesUserIsIn'
      },
      {
        collection: 'users',
        doc: `${props.uuid}`
      }
    ];
  })
)(CreateThreadModal);

const MiniModalLeft = styled.div`
  display: none;
  position: absolute;
  left: -250px;
  width: 220px;
  padding: 15px 10px;
  flex-direction: column;
  background-color: #3f3b50;
  border-radius: 15px;
`;
const StyledContainerTitles = styled.p`
  color: white;
  font-size: 10px;
`;
const TextStylingContainer = styled.div`
  border-radius: 15px;
  background-color: #322f40;
  width: 100%;
`;
const TextStylingIcon = styled.img`
  height: 10px;
  padding-right: 10px;
`;
const TextStylingButtons = styled.button`
  cursor: pointer;
  width: 100%;
  color: white;
  background-color: #322f40;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: none;
  border-radius: 15px;
  padding: 10px 15px;
  font-size: 10px;
  outline: none;
`;
const MiniModalRight = styled.div`
  position: absolute;
  right: -250px;
  width: 200px;
  padding: 15px 10px;
  background-color: #3f3b50;
  border-radius: 15px;
  .ui.selection.dropdown {
    color: white;
    background-color: transparent;
    border: none;
    outline: none;
  }
`;

const StyledInputsContainer = styled.div`
  padding: 10px 30px;
  height: 500px;
`;
const StyledTitleInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  height: 56px;
  font-family: 'Open Sans', sans-serif;
  font-size: 36px;
  font-weight: 300;
  line-height: 1.11;
  margin-bottom: 20px;
`;
const StyledThreadInput = styled.div`
  border: none;
  outline: none;
  width: 100%;
  height: 440px;
`;
const StyledActions = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CursonImg = styled.img`
  cursor: pointer;
  height: 16px;
`;
const StyledIconButton = styled.button`
  color: #5c4df2;
  background-color: white;
  border: 1px solid #5c4df2;
  border-radius: 50%;
  outline: none;
  padding: 5px 7px 3px 7px;
`;
const StyledButton = styled.button`
  cursor: pointer;
  padding: 5px 25px;
  color: white;
  border: 1px solid #5c4df2;
  border-radius: 15px;
  outline: none;
  background-color: #5c4df2;
  margin-right: 10px;
  &:disabled {
    background-color: #cfd5f2;
    border: 1px solid #cfd5f2;
  }
`;
const StyledBackButton = styled.button`
  cursor: pointer;
  padding: 5px 25px;
  color: #5c4df2;
  border: 1px solid #5c4df2;
  border-radius: 15px;
  outline: none;
  background-color: white;
  margin-right: 10px;
  &:disabled {
    background-color: #cfd5f2;
    border: 1px solid #cfd5f2;
  }
`;
