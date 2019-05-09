import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import styled from 'styled-components';

import textCursor from '../../images/icon-cursor-purple.svg';

export default class CreateThreadModal extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty(), threadTitle: '' };
    this.onChange = (editorState) => this.setState({ editorState });
    this.focus = () => this.refs.editor.focus();
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleKeyCommand = (command) => {
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

  render() {
    return (
      <Modal open={this.props.shoudlBeOpen} size='small'>
        <div className='editor'>
          <button onClick={this.onUnderlineClick}>U</button>
          <button onClick={this.onBoldClick}>
            <b>B</b>
          </button>
          <button onClick={this.onItalicClick}>
            <em>I</em>
          </button>

          {/* <Editor editorState={this.state.editorState} onChange={this.onChange} handleKeyCommand={this.handleKeyCommand} /> */}
        </div>
        <Modal.Content>
          <StyledInputsContainer>
            <StyledTitleInput onClick={this.focus}>
              <Editor
                name='threadTitle'
                type='text'
                placeholder='Create a title'
                required
                onChange={this.onChange}
                editorState={this.state.editorState}
                handleKeyCommand={this.handleKeyCommand}
                ref='editor'
              />
            </StyledTitleInput>

            <StyledThreadInput
              name='threadTitle'
              type='text'
              placeholder='What would you like to discuss with your teammates?'
              required
              onChange={this.handleInputChange}
            />
          </StyledInputsContainer>
        </Modal.Content>

        <Modal.Actions>
          <StyledActions>
            <StyledIconButton>
              <CursonImg src={textCursor} alt='cursor' />
            </StyledIconButton>
            <div>
              <StyledBackButton
                onClick={(e) => {
                  e.preventDefault();
                  this.props.showModal(null);
                }}
              >
                Back
              </StyledBackButton>
              <StyledButton disabled={!this.state.threadTitle.length > 0}>Post</StyledButton>
            </div>
          </StyledActions>
        </Modal.Actions>
      </Modal>
    );
  }
}

const StyledInputsContainer = styled.div`
  padding: 10px 30px;
  height: 500px;
`;
const StyledTitleInput = styled.div`
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
const StyledThreadInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
`;
const StyledActions = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CursonImg = styled.img`height: 16px;`;
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
