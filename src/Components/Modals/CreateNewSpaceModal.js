import React, { Component } from "react";
import {
  Header,
  Modal,
  Dropdown
} from "semantic-ui-react";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import {
  firestoreConnect,
  withFirestore
} from "react-redux-firebase";
import uuid from "uuid";
import plusIcon from "../../images/icon-plus-lightgray.svg";

//Redux action
import { showModal } from "../../redux/actions/actionCreators";

//Styled components
import styled from "styled-components";

const activeOrg = '995fc6d6-eeaa-4880-9606-f33e98ad720e'

class CreateNewSpaceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaceName: '',
      spaceTopic: '',
    };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOpen = () => {
    this.setState({ model_open: true })
  }

  handleClose = () => {
    this.setState({ model_open: false })
  }

  spaceId = uuid();
  addSpaceToDatabase = () => {
    this.props.firestore.set(
      { collection: 'spaces', doc: this.spaceId },
      {
        spaceName: this.state.spaceName,
        spaceCreatedByUserId: window.localStorage.getItem('uuid'),
        spaceTopic: this.state.spaceTopic,
        orgId: activeOrg // harcoding for now, should get it from props in the future
      }
    );
  };

  render() {
    const { organisation } = this.props;
    const usersEmailsOptions = organisation.map(
      (email, index) => ({
        key: index,
        text: email,
        value: `${email.id}`
      })
    );

    return (
      <Modal
        trigger={
          <div>
            <img src={plusIcon} alt="plus icon" />
          </div>
        }
        open={this.state.model_open}
        onClose={this.handleClose}
        closeIcon
        size="tiny"
      >
        <StyledContainer>
          <Modal.Header>
            <div>
              <StyledMainHeader>Create a new space</StyledMainHeader>
              {console.log(organisation[0])}
            </div>
            <div>
              <Header as="h5">Space name</Header>
              <StyledInput
                name="spaceName"
                placeholder="Product Design"
                type="text"
                required
                value={this.state.spaceName}
                onChange={this.handleInputChange}
              />
              <Header as="h5">
                What types of discussions happen here?
                <StyledOptional>(Optional)</StyledOptional>
              </Header>
              <StyledInput
                name="spaceTopic"
                placeholder="Questions and thoughts about proposals"
                type="text"
                value={this.state.spaceTopic}
                onChange={this.handleInputChange}
              />
              <Header as="h5">Members</Header>
              <Dropdown
                placeholder="Choose people to add"
                fluid
                multiple
                search
                selection
                options={usersEmailsOptions}
              />

              <Modal.Actions>
                {/*  <StyledButtonCancel
                  onClick={e => {
                    e.preventDefault();
                    this.props.history.push('/');
                  }}
                >
                  Cancel
                </StyledButtonCancel> */}

                <StyledButtonCancel
                  onClick={this.handleClose}
                >
                  Cancel
                </StyledButtonCancel>

                <StyledButtonCreateSpace
                  type="submit"
                  onClick={e => {
                    e.preventDefault();
                    this.addSpaceToDatabase();
                    this.handleSubmit();

                    console.log(
                      'This space has been created:',
                      this.state.spaceName
                    );
                  }}
                >
                  Create Space
                </StyledButtonCreateSpace>
              </Modal.Actions>
            </div>
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
    organisation: state.firestore.ordered.activeOrgFromDatabase ? state.firestore.ordered.activeOrgFromDatabase : []
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
  margin-top: 50px;
  margin-left: 253px;
  margin-right: 12px;
  padding: 5px 15px;
  color: #5c4df2;
  border-radius: 15px;
  background-color: white;
  border-color: #5c4df2;
`;

const StyledButtonCreateSpace = styled.button`
  padding: 5px 15px;
  color: white;
  border-radius: 15px;
  background-color: lightgray;
  &:focus {
    background-color: #5c4df2;
  }
`;

const StyledInput = styled.input`
  width: 470px;
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
  font-family: "Open Sans";
  padding-bottom: 30px;
`;

const StyledOptional = styled.div`
  font-size: 14px;
  font-family: Lato, "Helvetica Neue", Arial, Helvetica, sans-serif;
  line-height: 1.82;
  color: rgba(38, 46, 51, 0.5);
  margin-left: 257px;
  margin-top: -24px;
`;
