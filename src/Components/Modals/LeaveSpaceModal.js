import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';

//Redux action
import { showModal, resetSpace } from '../../redux/actions/actionCreators';

//Styled components
import styled from 'styled-components';

export class LeaveSpaceModal extends Component {
  handleOpen = () => {
    this.setState({ model_open: true });
  };

  handleClose = () => {
    this.setState({ model_open: false });
  };

  removeUserFromSpace = () => {
    this.props.firestore.update(
      { collection: 'spaces', doc: this.props.space.id },
      {
        arrayOfUserIdsInSpace: this.props.firestore.FieldValue.arrayRemove(
          localStorage.getItem('uuid')
        )
      }
    );
  };

  removeSpaceFromUser = () => {
    this.props.firestore.update(
      { collection: 'users', doc: localStorage.getItem('uuid') },
      {
        arrayOfSpaceIds: this.props.firestore.FieldValue.arrayRemove(
          this.props.space.id
        ),
        arrayOfSpaceNames: this.props.firestore.FieldValue.arrayRemove(
          this.props.space.spaceName
        )
      }
    );
  };

  render() {
    return (
      <Modal
        open={this.props.shoudlBeOpen}
        size="small"
        aria-label="Leave Space Modal"
      >
        <StyledContainer>
          <Modal.Header>
            <div>
              <StyledMainHeader>
                Are you really really sure that you want to leave space{' '}
                <strong>{this.props.space.spaceName}</strong>?
              </StyledMainHeader>
            </div>

            <Modal.Actions>
              <StyledActions>
                <StyledButtonCancel
                  onClick={() => {
                    this.handleClose();
                    this.props.showModal(null);
                  }}
                >
                  Cancel
                </StyledButtonCancel>

                <StyledButtonCreateSpace
                  type="submit"
                  onClick={e => {
                    e.preventDefault();
                    this.props.showModal(null);
                    this.removeSpaceFromUser();
                    this.removeUserFromSpace();
                    this.handleClose();
                    this.props.resetSpace();
                  }}
                >
                  Leave Space
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
    activeModal: state.modal.activeModal,
    threads: state.firestore.ordered.threads
      ? state.firestore.ordered.threads
      : []
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ showModal, resetSpace }, dispatch);
};

//Styled Components
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(),
  withFirestore
)(LeaveSpaceModal);

const StyledContainer = styled.div`
  padding: 40px;
  border-radius: 6px;
  position: relative;
`;
const StyledButtonCancel = styled.button`
  cursor: pointer;
  padding: 5px 25px;
  color: #00bc98;
  border-radius: 15px;
  background-color: white;
  border: 1px solid #00bc98;
  margin-right: 10px;
`;
const StyledButtonCreateSpace = styled.button`
  cursor: pointer;
  padding: 5px 25px;
  color: white;
  border: 1px solid #00bc98;
  border-radius: 15px;
  outline: none;
  background-color: #00bc98;
  &:disabled {
    background-color: #00bc9880;
    border: none;
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
