import React, { Component } from 'react';
import { Header, Modal, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firestoreConnect, withFirestore, isEmpty } from 'react-redux-firebase';
import Spinner from '../semantic-components/Spinner';
import uuid from 'uuid';
import plusIcon from '../../images/icon-plus-lightgray.svg';

//Redux action
import { showModal } from '../../redux/actions/actionCreators';

//Styled components
import styled from 'styled-components';

const activeOrg = '0016571a-0b11-40f3-9c5c-cb7117f00f71';

class CreateNewSpaceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaceName: '',
      spaceTopic: '',
      idsInSpace: []
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOpen = () => {
    this.setState({ model_open: true });
  };

  handleClose = () => {
    this.setState({ model_open: false });
  };

  spaceId = uuid();
  addSpaceToDatabase = () => {
    this.props.firestore.set(
      { collection: 'spaces', doc: this.spaceId },
      {
        spaceName: this.state.spaceName,
        spaceCreatedByUserId: window.localStorage.getItem('uuid'),
        spaceTopic: this.state.spaceTopic,
        orgId: activeOrg,
        arrayOfUserIdsInSpace: this.state.idsInSpace
      }
    );
  };

  setIdsToState = (e, data) => {
    e.preventDefault();
    const { value } = data;
    this.setState({ idsInSpace: value });
  };

  render() {
    const { organisation } = this.props;

    if (isEmpty(organisation[0])) {
      return <Spinner />;
    } else {
      const userIdsOptions = organisation[0].arrayOfUsersIds.map((id, index) => ({
        key: index,
        text: organisation[0].arrayOfUsersEmails[index],
        value: `${id}`
      }));
      return (
        <Modal
          trigger={
            <div>
              <img src={plusIcon} alt='plus icon' onClick={this.handleOpen} />
            </div>
          }
          open={this.state.model_open}
          size='tiny'
        >
          <StyledContainer>
            <Modal.Header>
              <div>
                <StyledMainHeader>Create a new space</StyledMainHeader>
              </div>
              <div>
                <Header as='h5'>Space name</Header>
                <StyledInput
                  name='spaceName'
                  placeholder='Product Design'
                  type='text'
                  required
                  value={this.state.spaceName}
                  onChange={this.handleInputChange}
                />
                <Header as='h5'>
                  What types of discussions happen here?
                  <StyledOptional>(Optional)</StyledOptional>
                </Header>
                <StyledInput
                  name='spaceTopic'
                  placeholder='Questions and thoughts about proposals'
                  type='text'
                  value={this.state.spaceTopic}
                  onChange={this.handleInputChange}
                />
                <Header as='h5'>Members</Header>
                <Dropdown
                  placeholder='Choose people to add'
                  fluid
                  multiple
                  search
                  selection
                  options={userIdsOptions}
                  onChange={this.setIdsToState}
                />
                <Modal.Actions>
                  <StyledActions>
                    <StyledButtonCancel onClick={this.handleClose}>Cancel</StyledButtonCancel>

                    <StyledButtonCreateSpace
                      type='submit'
                      disabled={!this.state.spaceName.length > 0}
                      onClick={(e) => {
                        e.preventDefault();
                        this.addSpaceToDatabase();

                        console.log('This space has been created:', this.state.spaceName);
                      }}
                    >
                      Create Space
                    </StyledButtonCreateSpace>
                  </StyledActions>
                </Modal.Actions>
              </div>
            </Modal.Header>
          </StyledContainer>
        </Modal>
      );
    }
  }
}

//Export component wrapped in redux actions and store and firestore
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    activeModal: state.modal.activeModal,
    organisation: state.firestore.ordered.activeOrgFromDatabase ? state.firestore.ordered.activeOrgFromDatabase : [],
    user: state.firestore.ordered.users ? state.firestore.ordered.users : []
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ showModal }, dispatch);
};

//Styled Components
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: 'organisations',
        doc: activeOrg,
        storeAs: 'activeOrgFromDatabase'
      }
    ];
  }),
  withFirestore
)(CreateNewSpaceModal);

const StyledContainer = styled.div`
  padding: 40px;
  border-radius: 6px;
  position: relative;
`;
const StyledButtonCancel = styled.button`
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
const StyledInput = styled.input`
  width: 100%;
  font-size: 19px;
  border: none;
  border-bottom: 2px solid lightgray;
  padding: 5px 0;
  margin-bottom: 10px;
  &:focus {
    border-bottom: 2px solid #6c48f2;
    outline: none;
  }
`;
const StyledMainHeader = styled.div`
  font-size: 24px;
  color: rgb(55, 71, 80);
  font-family: 'Open Sans', sans-serif;
  padding-bottom: 30px;
`;
const StyledOptional = styled.div`
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  line-height: 1.82;
  color: rgba(38, 46, 51, 0.5);
  margin-left: 257px;
  margin-top: -24px;
`;
const StyledActions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 30px;
`;
