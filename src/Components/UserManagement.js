import React, { Component } from 'react';

import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';

//Import semantic components
import { Header, Modal, Message } from 'semantic-ui-react';

class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamEmailAddress: [''],
      alert: false
    };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //Add email input when clicked on email
  appendInput = () => {
    this.setState(prevState => ({ teamEmailAddress: prevState.teamEmailAddress.concat(['']) }));
  };

  //Add email to state
  addEmail = (email, index) => {
    this.setState(pr => ({
      teamEmailAddress: pr.teamEmailAddress.map((value, i) => {
        if (i === index) {
          return email;
        }
        return value;
      })
    }));
  };

  checkIfEmail = email => {
    let re = /(^$|^.*@.*\..*$)/;
    return re.test(email);
  };

  removeOrgFromUser = id => {
    this.props.firestore.update(
      { collection: 'users', doc: id },
      {
        arrayOfOrgsIds: this.props.firestore.FieldValue.arrayRemove(this.props.organisation.id),
        arrayOfOrgsNames: this.props.firestore.FieldValue.arrayRemove(this.props.organisation.orgName)
      }
    );
  };

  removeUserFromOrg = (id, email) => {
    this.props.firestore.update(
      { collection: 'organisations', doc: this.props.organisation.id },
      {
        arrayOfUsersEmails: this.props.firestore.FieldValue.arrayRemove(email),
        arrayOfUsersIds: this.props.firestore.FieldValue.arrayRemove(id)
      }
    );
  };

  removeSpacesFromUser = id => {
    this.props.spaces.forEach(space => {
      this.props.firestore
        .update(
          {
            collection: 'spaces',
            doc: space.id
          },
          {
            arrayOfUserIdsInSpace: this.props.firestore.FieldValue.arrayRemove(id)
          }
        )
        .then(res =>
          this.props.firestore.update(
            {
              collection: 'users',
              doc: id
            },
            {
              arrayOfSpaceIds: this.props.firestore.FieldValue.arrayRemove(space.id),
              arrayOfSpaceNames: this.props.firestore.FieldValue.arrayRemove(space.spaceName)
            }
          )
        );
    });
  };

  addUserEmailsToOrgDatabase = () => {
    let usersEmailsWithoutEmptyStrings = this.state.teamEmailAddress.filter(Boolean).map(e => {
      return e;
    });
    usersEmailsWithoutEmptyStrings.forEach(email => {
      this.props.firestore.update(
        {
          collection: 'organisations',
          doc: this.props.organisation.id
        },
        {
          arrayOfUsersEmails: this.props.firestore.FieldValue.arrayUnion(email)
        }
      );
    });
  };

  render() {
    if (this.props.organisation.createdByUserId === localStorage.getItem('uuid')) {
      return (
        <Modal open={true} size="tiny">
          <StyledContainer>
            <StyledMainHeader>Your team</StyledMainHeader>

            <div>
              <StyledHeaderContainer>
                <Header as="h5">Active Members</Header>
                <Subheader>Be careful when deleting, can't be undone.</Subheader>
              </StyledHeaderContainer>
              {this.props.listOfUsersWithinTheOrg.length > 0 &&
                this.props.listOfUsersWithinTheOrg
                  .filter(user => user.id !== this.props.uuid)
                  .map(u => {
                    return (
                      <StyledUserContainer key={u.id}>
                        <div>{u.fullName}</div>
                        <StyledButtonDelete
                          onClick={e => {
                            e.preventDefault();
                            this.removeSpacesFromUser(u.id);
                            this.removeOrgFromUser(u.id);
                            this.removeUserFromOrg(u.id, u.userEmail);
                          }}>
                          Delete
                        </StyledButtonDelete>
                      </StyledUserContainer>
                    );
                  })}
              <StyledModalCard>
                <Modal.Content>
                  <StyledModalForm>
                    <Header as="h5">Invite users</Header>
                    <div id="dynamicInput">
                      {this.state.teamEmailAddress.map((input, i) => (
                        <StyledModalInput
                          placeholder="Email address"
                          type="email"
                          value={this.state.teamEmailAddress[i]}
                          onChange={e => {
                            this.addEmail(e.target.value, i);
                          }}
                          key={i}
                        />
                      ))}
                    </div>
                  </StyledModalForm>
                  <StyledModalAdder onClick={() => this.appendInput()}>Add more emails</StyledModalAdder>
                </Modal.Content>
                <Modal.Actions>
                  <StyledActionButtonsContainer>
                    <StyledModalButton
                      onClick={e => {
                        e.preventDefault();
                        this.setState({ alert: false });
                        if (
                          this.props.organisation.arrayOfUsersEmails.length +
                            this.state.teamEmailAddress.filter(Boolean).length >
                            19 &&
                          this.props.organisation.isPremium === false
                        ) {
                          this.setState({ alert: 'subscription' });
                        } else if (!this.state.teamEmailAddress.every(this.checkIfEmail)) {
                          this.setState({ alert: 'email' });
                        } else {
                          this.addUserEmailsToOrgDatabase();
                          this.props.history.push('/homescreen');
                        }
                      }}>
                      Invite
                    </StyledModalButton>
                    <StyledModalMainButtonContainer>
                      <StyledModalButton
                        className="cancel-button"
                        onClick={e => {
                          e.preventDefault();
                          this.props.history.push('/homescreen');
                        }}>
                        Cancel
                      </StyledModalButton>
                    </StyledModalMainButtonContainer>
                  </StyledActionButtonsContainer>
                </Modal.Actions>
              </StyledModalCard>

              {this.state.alert === 'email' && (
                <StyledAlertMessage>
                  <Message color="red">Please make sure that you are using valid email address.</Message>
                </StyledAlertMessage>
              )}
              {this.state.alert === 'subscription' && (
                <StyledAlertMessage>
                  <Message color="red">
                    With free version you can invite up to 20 users. If you want to invite more, please upgrade your
                    account.
                  </Message>
                </StyledAlertMessage>
              )}
            </div>
          </StyledContainer>
        </Modal>
      );
    }
    if (this.props.organisation.createdByUserId !== localStorage.getItem('uuid')) {
      return (
        <Modal open={true} size="tiny">
          <StyledContainer>
            <StyledMainHeader>Your team</StyledMainHeader>

            {this.props.listOfUsersWithinTheOrg.length > 0 &&
              this.props.listOfUsersWithinTheOrg
                .filter(user => user.id !== this.props.uuid)
                .map(u => {
                  return (
                    <StyledUserContainer key={u.id}>
                      <div>{u.fullName}</div>
                    </StyledUserContainer>
                  );
                })}
          </StyledContainer>
          <StyledModalMainButtonContainer>
            <StyledModalButton
              className="cancel-button"
              onClick={e => {
                e.preventDefault();
                this.props.history.push('/homescreen');
              }}>
              Go back
            </StyledModalButton>
          </StyledModalMainButtonContainer>
        </Modal>
      );
    }
  }
}

//Export component wrapped in redux actions and store and firestore
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    user: state.firestore.ordered.users ? state.firestore.ordered.users : [],
    organisation: state.firestore.ordered.organisations ? state.firestore.ordered.organisations[0] : [],
    spaces: state.firestore.ordered.spaces ? state.firestore.ordered.spaces : [],
    uuid: localStorage.getItem('uuid') ? localStorage.getItem('uuid') : '',
    listOfUsersWithinTheOrg: state.firestore.ordered.usersWithinTheOrg ? state.firestore.ordered.usersWithinTheOrg : []
  };
};

const mapDispatchToProps = {};

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
        where: [['arrayOfOrgsIds', 'array-contains', localStorage.getItem('activeOrg')]],
        storeAs: 'usersWithinTheOrg'
      },
      {
        collection: 'organisations',
        doc: localStorage.getItem('activeOrg')
      },
      {
        collection: 'spaces',
        where: [['orgId', '==', localStorage.getItem('activeOrg')]]
      }
    ];
  }),
  withFirestore
)(UserManagement);

const StyledContainer = styled.div`
  padding: 40px;
  border-radius: 6px;
  position: relative;
`;
const StyledButtonDelete = styled.button`
  cursor: pointer;
  padding: 2px 7px;
  background-color: #5c4df2;
  color: white;
  border-radius: 15px;
  margin-left: 10px;
  border: none;
  font-size: 0.9rem;
`;

const Subheader = styled.div`
  font-size: 0.9rem;
  color: #bdc3c9;
  margin-left: 10px;
`;
const StyledMainHeader = styled.div`
  font-size: 24px;
  color: rgb(55, 71, 80);
  font-family: 'Open Sans', sans-serif;
  padding-bottom: 30px;
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  .ui.header {
    margin: 0;
  }
`;

const StyledModalCard = styled.div`
  background-color: white;
  margin-top: 50px;
  border-radius: 5px;
  input:focus,
  button:focus,
  textarea:focus {
    outline: none;
  }
`;

const StyledAlertMessage = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const StyledModalForm = styled.form`
  padding: 0 0 25px 0;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 20px;
  .heading {
    padding-bottom: 15px;
  }
`;

const StyledModalInput = styled.input`
  width: 98%;
  border: none;
  border-bottom: 2px solid #bdc3c9;
  padding: 10px 0 5px 0;
  margin-bottom: 10px;
  &::placeholder {
    font-size: 1rem;
  }
`;

const StyledUserContainer = styled.div`
  display: flex;
  margin: 20px 0;
  align-items: center;
  font-size: 1rem;
`;

const StyledModalButton = styled.button`
  width: 100px;
  padding: 5px 15px;
  margin: 0 25px 25px 0;
  color: white;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  background-color: #5c4df2;
`;

const StyledActionButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row-reverse;
`;

const StyledModalMainButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  .cancel-button {
    color: #5c4df2;
    background-color: white;
    border: 2px solid #5c4df2;
  }
`;

const StyledModalAdder = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #5c4df2;
  cursor: pointer;
`;
