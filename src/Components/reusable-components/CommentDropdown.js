import React from 'react';

//Semantic components
import { Dropdown } from 'semantic-ui-react';

//Main component
export default class CommentDropdown extends React.Component {
  render() {
    return (
      <Dropdown>
        <Dropdown.Menu>
          <Dropdown.Item text="Mark as Decision" />
          {localStorage.getItem('uuid') === this.props.createdByUserId && (
            <Dropdown.Item text="Edit Comment" onClick={() => this.props.setIsUpdating(true)} />
          )}
          {localStorage.getItem('uuid') === this.props.createdByUserId && (
            <Dropdown.Item text="Delete Comment" onClick={() => this.props.deleteComment(this.props.commentId)} />
          )}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
