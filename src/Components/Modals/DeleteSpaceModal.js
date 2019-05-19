import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';

//Redux action
import { showModal } from '../../redux/actions/actionCreators';

//Styled components
import styled from 'styled-components';

class DeleteSpaceModal extends Component {
  handleOpen = () => {
    this.setState({ model_open: true });
  };

  handleClose = () => {
    this.setState({ model_open: false });
  };

  deleteSpaceFromDatabase = () => {
    this.props.firestore
      .collection('spaces')
      .doc(this.props.space.id)
      .delete();
  };

  removeSpaceFromUsers = () => {
    this.props.space.arrayOfUserIdsInSpace.map(id => {
      return this.props.firestore.update(
        { collection: 'users', doc: id },
        {
          arrayOfSpaceIds: this.props.firestore.FieldValue.arrayRemove(this.props.space.id),
          arrayOfSpaceNames: this.props.firestore.FieldValue.arrayRemove(this.props.space.spaceName)
        }
      );
    });
  };

  render() {
    return (
      <Modal open={this.props.shoudlBeOpen} size="tiny">
        <StyledContainer>
          <Modal.Header>
            <div>
              <StyledMainHeader>
                Are you really really sure that you want to delete space <strong>{this.props.space.spaceName}</strong>?
              </StyledMainHeader>
            </div>

            <Modal.Actions>
              <StyledActions>
                <StyledButtonCancel
                  onClick={() => {
                    this.handleClose();
                    this.props.showModal(null);
                  }}>
                  Cancel
                </StyledButtonCancel>

                <StyledButtonCreateSpace
                  type="submit"
                  onClick={e => {
                    e.preventDefault();
                    this.props.showModal(null);
                    this.deleteSpaceFromDatabase();
                    this.removeSpaceFromUsers();
                    this.handleClose();
                    this.props.resetThread();
                    this.props.resetSpace();
                    this.props.history.push('/homescreen');
                  }}>
                  Delete Space
                </StyledButtonCreateSpace>
              </StyledActions>
            </Modal.Actions>
          </Modal.Header>
        </StyledContainer>
      </Modal>
    );
  }
}

//Export component wrapped in redux actions and store and firestore
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    activeModal: state.modal.activeModal
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ showModal }, dispatch);
};

//Styled Components
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    return [
      {
        collection: 'users',
        doc: `${props.uuid}`
      },
      {
        collection: 'users',
        where: [['arrayOfOrgsIds', 'array-contains', `${props.activeOrg}`]],
        storeAs: 'usersWithinTheOrg'
      }
    ];
  }),
  withFirestore
)(DeleteSpaceModal);

const StyledContainer = styled.div`
  padding: 40px;
  border-radius: 6px;
  position: relative;
`;
const StyledButtonCancel = styled.button`
  cursor: pointer;
  padding: 5px 25px;
  color: #5c4df2;
  border-radius: 15px;
  background-color: white;
  border: 1px solid #5c4df2;
  margin-right: 10px;
`;
const StyledButtonCreateSpace = styled.button`
  cursor: pointer;
  padding: 5px 25px;
  color: white;
  border: 1px solid #5c4df2;
  border-radius: 15px;
  outline: none;
  background-color: #5c4df2;
  &:disabled {
    background-color: #cfd5f2;
    border: 1px solid #cfd5f2;
  }
`;

const StyledMainHeader = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: rgb(55, 71, 80);
  font-family: 'Open Sans', sans-serif;
  padding-bottom: 30px;
`;

const StyledActions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 30px;
`;
