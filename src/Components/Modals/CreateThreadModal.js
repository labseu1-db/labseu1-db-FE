import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import { Modal, Dropdown, Message, Icon } from "semantic-ui-react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  ContentState
} from "draft-js";
import uuid from "uuid";
import "draft-js/dist/Draft.css";
import styled from "styled-components";

import textCursor from "../../images/icon-cursor-purple.svg";
import boldIcon from "../../images/icon-bold-white.svg";
import codeIcon from "../../images/icon-code-white.svg";
import italicIcon from "../../images/icon-italic-white.svg";
import underlineIcon from "../../images/icon-underline-white.svg";

class CreateThreadModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      threadName: "",
      threadTopic: "",
      spaceId: "",
      threadCreatedByUserName: "",
      display: "none"
    };
    this.onChange = editorState => {
      const contentState = editorState.getCurrentContent();
      const oldContent = this.state.editorState.getCurrentContent();
      let rawDraftContentState = convertToRaw(
        this.state.editorState.getCurrentContent()
      );
      let threadTopic = rawDraftContentState.blocks[0].text;
      let words = threadTopic.split(" ");
      let wordsWithSpecificLength = words.every(word => word.length <= 70);
      if (
        contentState === oldContent ||
        (threadTopic.length <= 800 && wordsWithSpecificLength) ||
        window.event.which === 8
      ) {
        this.setState({ editorState });
        this.setState({ error2: "" });
        this.setState({ error3: "" });
      } else {
        const editorState = EditorState.undo(
          EditorState.push(
            this.state.editorState,
            ContentState.createFromText(oldContent.getPlainText()),
            "delete-character"
          )
        );
        this.setState({ editorState });
      }
      if (threadTopic.length > 800) {
        this.setState({ error2: "toManyThreadTopicCharacters" });
      }
      if (!wordsWithSpecificLength) {
        editorState = EditorState.undo(editorState);
        this.setState({ error3: "wordIsTooLong" });
      }
      this.focus = () => this.refs.editor.focus();
    };
  }

  componentWillMount() {}

  saveEditorText = () => {
    let rawDraftContentState = convertToRaw(
      this.state.editorState.getCurrentContent()
    );
    this.setState({ threadTopic: rawDraftContentState.blocks[0].text }, () =>
      this.addNewThread()
    );
  };

  saveSpaceToThread = (e, data) => {
    e.preventDefault();
    const { value } = data;
    this.setState({ spaceId: value });
  };

  handleInputChange = event => {
    if (
      this.state.threadName.length <= 40 ||
      event.target.name !== "threadName" ||
      window.event.inputType === "deleteContentBackward"
    ) {
      this.setState({ [event.target.name]: event.target.value });
      this.setState({ error: "" });
    } else if (
      this.state.threadName.length > 40 &&
      event.target.name === "threadName"
    ) {
      this.setState({ error: "toManyCharactersInThreadName" });
    }
  };

  toggleMiniMondal = () => {
    let miniModal = document.getElementById("miniModal");
    if (miniModal.style.display === "none") {
      miniModal.style.display = "flex";
    } else {
      miniModal.style.display = "none";
    }
  };

  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  onUnderlineClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );
  };

  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  };

  onItalicClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );
  };

  onCodeClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "CODE"));
  };

  threadId = uuid();
  addNewThread = () => {
    this.props.firestore
      .set(
        { collection: "threads", doc: this.threadId },
        {
          threadName: this.state.threadName,
          threadTopic: this.state.threadTopic,
          threadCreatedByUserId: window.localStorage.getItem("uuid"),
          threadCreatedByUserName: this.props.user.fullName,
          threadCreatedAt: Date.now(),
          spaceId: this.props.match.params.spaceId,
          orgId: this.props.match.params.id,
          lastCommentCreatedAt: Date.now(),
          whenUserHasSeen: { [localStorage.getItem("uuid")]: Date.now() }
        }
      )
      .then(() => {
        let threadRef = this.props.firestore
          .collection("threads")
          .doc(this.threadId);
        let whenUserHasSeen = {};
        whenUserHasSeen[
          `whenUserHasSeen.${localStorage.getItem("uuid")}`
        ] = Date.now();
        threadRef.update(whenUserHasSeen);
      })
      .then(() => this.props.showModal(null))
      .then(() =>
        this.props.history.push(
          `/mainscreen/${this.props.match.params.id}/${this.props.match.params.spaceId}/${this.threadId}`
        )
      )
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
      <Modal open={this.props.shoudlBeOpen} size='small'>
        <MiniModalLeft id='miniModal'>
          <StyledContainerTitles>Text Styling</StyledContainerTitles>
          <TextStylingContainer>
            <TextStylingButtons onClick={this.onBoldClick}>
              <TextStylingIcon src={boldIcon} alt='bold' />
              <p>Bold</p>
            </TextStylingButtons>
            <TextStylingButtons onClick={this.onItalicClick}>
              <TextStylingIcon src={italicIcon} alt='italic' />
              <p>Italic</p>
            </TextStylingButtons>
            <TextStylingButtons onClick={this.onUnderlineClick}>
              <TextStylingIcon src={underlineIcon} alt='underline' />
              <p>Underline</p>
            </TextStylingButtons>
            <TextStylingButtons onClick={this.onCodeClick}>
              <TextStylingIcon src={codeIcon} alt='code' />
              <p>Code</p>
            </TextStylingButtons>
          </TextStylingContainer>
        </MiniModalLeft>
        <MiniModalRight>
          <StyledDropdown>
            <Dropdown
              placeholder='Add a Space'
              fluid
              search
              selection
              options={spaceOptions}
              basic={true}
              onChange={this.saveSpaceToThread}
            />
          </StyledDropdown>
        </MiniModalRight>
        <Modal.Content>
          <StyledInputsContainer>
            <StyledTitleInput
              name='threadName'
              type='text'
              placeholder='Create a title'
              required
              value={this.state.threadName}
              onChange={event => this.handleInputChange(event)}
            />
            {this.state.error === "toManyCharactersInThreadName" && (
              <Message warning attached='bottom'>
                <Icon name='warning' />
                Thread name can only have 40 characters
              </Message>
            )}
            <StyledThreadInput onClick={this.focus}>
              <Editor
                name='threadTopic'
                type='text'
                placeholder='What would you like to discuss with your teammates?'
                required
                onChange={this.onChange}
                editorState={this.state.editorState}
                handleKeyCommand={this.handleKeyCommand}
                ref='editor'
              />
              {this.state.error3 === "wordIsTooLong" && (
                <Message warning attached='bottom'>
                  <Icon name='warning' />A word can only be 70 characters long
                </Message>
              )}
              {this.state.error2 === "toManyThreadTopicCharacters" && (
                <Message warning attached='bottom'>
                  <Icon name='warning' />
                  Thread topic can only have 800 characters
                </Message>
              )}
            </StyledThreadInput>
          </StyledInputsContainer>
        </Modal.Content>

        <Modal.Actions>
          <StyledActions>
            <StyledIconButton onClick={this.toggleMiniMondal}>
              <CursonImg src={textCursor} alt='cursor' />
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
                disabled={
                  !this.state.threadName.length > 0 ||
                  !this.state.spaceId.length > 0
                }
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
    spacesForActiveOrg: state.firestore.ordered.spacesUserIsIn
      ? state.firestore.ordered.spacesUserIsIn
      : [],
    user: state.firestore.ordered.users ? state.firestore.ordered.users[0] : [],
    activeOrg: localStorage.getItem("activeOrg")
      ? localStorage.getItem("activeOrg")
      : "",
    uuid: localStorage.getItem("uuid") ? localStorage.getItem("uuid") : ""
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearFirestore: () => dispatch({ type: "@@reduxFirestore/CLEAR_DATA" })
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    return [
      {
        collection: "spaces",
        where: [
          ["arrayOfUserIdsInSpace", "array-contains", props.uuid],
          ["orgId", "==", props.match.params.id]
        ],
        storeAs: "spacesUserIsIn"
      },
      {
        collection: "users",
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
  background-color: #11282d;
  border-radius: 15px;
`;

const StyledContainerTitles = styled.p`
  color: white;
  font-size: 10px;
`;
const TextStylingContainer = styled.div`
  border-radius: 15px;
  background-color: #11282d;
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
  background-color: #11282d;
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
  background-color: #11282d;
  border-radius: 15px;
  .ui.selection.dropdown {
    color: white;
    background-color: transparent;
    border: none;
    outline: none;
  }
`;
const StyledDropdown = styled.div`
  .ui.dropdown .menu > .item:hover {
    background: #00bc98;
    color: white;
  }
  .ui.dropdown:not(.button) > .default.text {
    color: white;
  }
  .item {
    margin: 5px;
    border-radius: 5px;
  }
  .ui.label {
    background: #00bc98;
    color: white;
    border: none;
  }
  .i.icon.delete {
    color: white;
  }
  div {
    color: white;
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
  font-family: "Open Sans", sans-serif;
  font-size: 36px;
  font-weight: 300;
  line-height: 1.11;
  margin-bottom: 20px;
`;
const StyledThreadInput = styled.div`
  border: none;
  outline: none;
  width: 100%;
  height: 320px;
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
  color: #00bc98;
  background-color: white;
  border: 1px solid #00bc98;
  border-radius: 50%;
  outline: none;
  padding: 5px 7px 3px 7px;
`;
const StyledButton = styled.button`
  cursor: pointer;
  padding: 5px 25px;
  color: white;
  border: 1px solid #00bc98;
  border-radius: 15px;
  outline: none;
  background-color: #00bc98;
  margin-right: 10px;
  &:disabled {
    background-color: #00bc9880;
    border: none;
  }
`;
const StyledBackButton = styled.button`
  cursor: pointer;
  padding: 5px 25px;
  color: #00bc98;
  border: 1px solid #00bc98;
  border-radius: 15px;
  outline: none;
  background-color: white;
  margin-right: 10px;
  &:disabled {
    background-color: #00bc9880;
    border: none;
  }
`;
