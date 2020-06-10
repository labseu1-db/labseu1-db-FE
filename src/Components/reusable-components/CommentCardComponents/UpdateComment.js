import React, { useState, useContext } from 'react';
import styled from 'styled-components';

//Import components
import ScreenButton from '../ScreenButton';

//Import icons
import IconPenWhite from '../../../images/icon-pen-white.svg';

// import Context
import Context from '../../ContextProvider/Context';

//Main component
export const UpdateComment = props => {
  const { updateDataWithDoc } = useContext(Context);

  const [text, setText] = useState(props.content);

  const handleInputChange = e => {
    setText(e.target.value);
  };

  const clearInput = () => {
    setText('');
  };
  const updateComment = e => {
    e.preventDefault();
    let request = {
      collection: 'comments',
      docId: props.commentId,
      data: {
        commentBody: text,
        isCommentUpdated: true,
        commentUpdatedAt: Date.now()
      }
    };
    updateDataWithDoc(request);
  };

  return (
    <StyledCommentContainer
      aria-label="UpdateComment"
      onSubmit={e => {
        this.props.setIsUpdating(false);
        this.updateComment(e);
        this.clearInput();
      }}
    >
      <StyledTopContainer>
        <StyledInput name="text" value={text} onChange={handleInputChange} />
      </StyledTopContainer>
      <StyledButtonContainer>
        {text.length > 0 && (
          <ScreenButton
            content="Submit"
            backgroundColor="#00bc98"
            color="white"
            border="none"
            icon={IconPenWhite}
            onClick={e => {
              props.setIsUpdating(false);
              updateComment(e);
              clearInput();
            }}
          />
        )}
      </StyledButtonContainer>
    </StyledCommentContainer>
  );
};

//Styling
const StyledCommentContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 10px;
  background-color: white;
  width: 100%;
  margin-top: 30px;
`;

const StyledTopContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const StyledInput = styled.input`
  margin-left: 30px;
  border: 1px solid #bdc3c9;
  width: 100%;
  border-radius: 10px;
  padding: 7px 10px;
  ::placeholder {
    color: #bdc3c9;
    font-size: 0.9rem;
  }
`;

const StyledButtonContainer = styled.div`
  align-self: flex-end;
  border: none;
  margin-top: 30px;
`;

export default UpdateComment;
