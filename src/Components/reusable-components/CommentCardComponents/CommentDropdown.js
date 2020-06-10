import React, { useContext } from 'react';
import styled from 'styled-components';

//Semantic components
import { Dropdown } from 'semantic-ui-react';
import Context from '../../ContextProvider/Context';

// import Context API

//Main component
export const CommentDropdown = props => {
  const { updateDataWithDoc } = useContext(Context);

  const markAsDecision = e => {
    e.preventDefault();
    let request = {
      collection: 'comments',
      docId: props.commentId,
      data: {
        isCommentDecided: true
      }
    };
    updateDataWithDoc(request);
  };

  const removeDecision = e => {
    e.preventDefault();
    let request = {
      collection: 'comments',
      docId: props.commentId,
      data: {
        isCommentDecided: false
      }
    };
    updateDataWithDoc(request);
  };

  return (
    <StyledDropdown aria-label="CommentDropdown">
      <Dropdown>
        <Dropdown.Menu>
          {!props.isCommentDecided && (
            <Dropdown.Item
              text="Mark as Decision"
              onClick={e => markAsDecision(e)}
            />
          )}
          {props.isCommentDecided && (
            <Dropdown.Item
              text="Remove decision"
              onClick={e => removeDecision(e)}
            />
          )}
          {localStorage.getItem('uuid') === props.createdByUserId && (
            <Dropdown.Item
              text="Edit Comment"
              onClick={() => props.setIsUpdating(true)}
            />
          )}
          {localStorage.getItem('uuid') === props.createdByUserId && (
            <Dropdown.Item
              text="Delete Comment"
              onClick={() => props.deleteComment(props.commentId)}
            />
          )}
        </Dropdown.Menu>
      </Dropdown>
    </StyledDropdown>
  );
};

//Styling
const StyledDropdown = styled.div`
  .ui.dropdown .menu > .item:hover {
    background: #00bc98;
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
`;

export default CommentDropdown;
