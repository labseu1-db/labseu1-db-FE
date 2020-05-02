import React, { useState, useEffect, useContext } from 'react';

import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';

//Import semantic components
import { Header, Modal, Message } from 'semantic-ui-react';

// Import Context API
import Context from './ContextProvider/Context';

const UserManagement = props => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     teamEmailAddress: ['', '', '', ''],

  //     alert: false
  //   };
  // }

  // use Context API
  const { getUsersFromOrg } = useContext(Context);

  const [teamEmailAddress, setTeamEmailAddress] = useState(['', '', '', '']);
  const [alert, setAlert] = useState(true);
  const [user, setUser] = useState('');
  const [spaces, setSpaces] = useState([]);
  const [org, setOrg] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsersFromOrg(setUsers, props.match.params.id);
  }, [getUsersFromOrg, props.match.params.id]);

  console.log(users);

  const handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //Add email input when clicked on email
  const appendInput = () => {
    this.setState(prevState => ({
      teamEmailAddress: prevState.teamEmailAddress.concat([''])
    }));
  };

  //Add email to state
  const addEmail = (email, index) => {
    this.setState(pr => ({
      teamEmailAddress: pr.teamEmailAddress.map((value, i) => {
        if (i === index) {
          return email;
        }
        return value;
      })
    }));
  };

  const checkIfEmail = email => {
    let re = /(^$|^.*@.*\..*$)/;
    return re.test(email);
  };

  const removeOrgFromUser = id => {
    props.firestore.update(
      { collection: 'users', doc: id },
      {
        arrayOfOrgsIds: props.firestore.FieldValue.arrayRemove(
          props.organisation.id
        ),
        arrayOfOrgsNames: props.firestore.FieldValue.arrayRemove(
          props.organisation.orgName
        )
      }
    );
  };

  const removeUserFromOrg = (id, email) => {
    props.firestore.update(
      { collection: 'organisations', doc: props.organisation.id },
      {
        arrayOfUsersEmails: props.firestore.FieldValue.arrayRemove(email),
        arrayOfUsersIds: props.firestore.FieldValue.arrayRemove(id)
      }
    );
  };

  const removeSpacesFromUser = id => {
    props.spaces.forEach(space => {
      props.firestore
        .update(
          {
            collection: 'spaces',
            doc: space.id
          },
          {
            arrayOfUserIdsInSpace: props.firestore.FieldValue.arrayRemove(id)
          }
        )
        .then(res =>
          props.firestore.update(
            {
              collection: 'users',
              doc: id
            },
            {
              arrayOfSpaceIds: props.firestore.FieldValue.arrayRemove(space.id),
              arrayOfSpaceNames: props.firestore.FieldValue.arrayRemove(
                space.spaceName
              )
            }
          )
        );
    });
  };

  const addUserEmailsToOrgDatabase = () => {
    let usersEmailsWithoutEmptyStrings = teamEmailAddress
      .filter(Boolean)
      .map(e => {
        return e;
      });
    usersEmailsWithoutEmptyStrings.forEach(email => {
      props.firestore.update(
        {
          collection: 'organisations',
          doc: props.organisation.id
        },
        {
          arrayOfUsersEmails: props.firestore.FieldValue.arrayUnion(email)
        }
      );
    });
  };

  if (props.organisation.createdByUserId === localStorage.getItem('uuid')) {
    return (
      <Modal open={true} size="tiny">
        <StyledContainer>
          <StyledMainHeader>Your Team</StyledMainHeader>

          <div>
            {props.listOfUsersWithinTheOrg.length > 1 && (
              <StyledHeaderContainer>
                <Header as="h5" className="first-heading">
                  Active Members
                </Header>
                <Subheader>
                  Be very careful when deleting users as this can't be undone.
                </Subheader>
              </StyledHeaderContainer>
            )}
            {props.listOfUsersWithinTheOrg.length > 0 &&
              props.listOfUsersWithinTheOrg
                .filter(user => user.id !== props.uuid)
                .map(u => {
                  return (
                    <StyledUserContainer key={u.id}>
                      <div>{u.fullName}</div>
                      <StyledButtonDelete
                        onClick={e => {
                          e.preventDefault();
                          removeSpacesFromUser(u.id);
                          removeOrgFromUser(u.id);
                          removeUserFromOrg(u.id, u.userEmail);
                        }}
                      >
                        Delete
                      </StyledButtonDelete>
                    </StyledUserContainer>
                  );
                })}
            <StyledModalCard>
              <Modal.Content>
                <StyledModalForm>
                  <Header as="h5">Invite more users</Header>

                  <div id="dynamicInput">
                    {teamEmailAddress.map((input, i) => (
                      <StyledModalInput
                        placeholder="Email address"
                        type="email"
                        value={teamEmailAddress[i]}
                        onChange={e => {
                          addEmail(e.target.value, i);
                        }}
                        key={i}
                      />
                    ))}
                  </div>
                </StyledModalForm>
                <StyledModalAdder onClick={() => appendInput()}>
                  Add more emails
                </StyledModalAdder>
              </Modal.Content>
              <Modal.Actions>
                <StyledActionButtonsContainer>
                  <StyledModalButton
                    onClick={e => {
                      e.preventDefault();
                      this.setState({ alert: false });
                      if (
                        props.organisation.arrayOfUsersEmails.length +
                          teamEmailAddress.filter(Boolean).length >
                          19 &&
                        props.organisation.isPremium === false
                      ) {
                        this.setState({ alert: 'subscription' });
                      } else if (!teamEmailAddress.every(this.checkIfEmail)) {
                        this.setState({ alert: 'email' });
                      } else {
                        addUserEmailsToOrgDatabase();
                        props.history.goBack();
                      }
                    }}
                  >
                    Invite
                  </StyledModalButton>
                  <StyledModalMainButtonContainer>
                    <StyledModalButton
                      className="cancel-button"
                      onClick={e => {
                        e.preventDefault();
                        props.history.goBack();
                      }}
                    >
                      Go back
                    </StyledModalButton>
                  </StyledModalMainButtonContainer>
                </StyledActionButtonsContainer>
              </Modal.Actions>
            </StyledModalCard>
            {alert === 'email' && (
              <StyledAlertMessage>
                <Message color="red">
                  Please make sure that you are using valid email address.
                </Message>
              </StyledAlertMessage>
            )}
            {alert === 'subscription' && (
              <StyledAlertMessage>
                <Message color="red">
                  With free version you can invite up to 20 users. If you want
                  to invite more, please upgrade your account.
                </Message>
              </StyledAlertMessage>
            )}
          </div>
        </StyledContainer>
      </Modal>
    );
  }
  if (props.organisation.createdByUserId !== localStorage.getItem('uuid')) {
    return (
      <Modal open={true} size="tiny">
        <StyledContainer>
          <StyledMainHeader>Your team</StyledMainHeader>

          {users.length > 0 &&
            users
              .filter(user => user.id !== props.uuid)
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
              props.history.goBack();
            }}
          >
            Go back
          </StyledModalButton>
        </StyledModalMainButtonContainer>
      </Modal>
    );
  }
};

//Export component wrapped in redux actions and store and firestore
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    user: state.firestore.ordered.users ? state.firestore.ordered.users : [],
    organisation: state.firestore.ordered.organisations
      ? state.firestore.ordered.organisations[0]
      : [],
    spaces: state.firestore.ordered.spaces
      ? state.firestore.ordered.spaces
      : [],
    uuid: localStorage.getItem('uuid') ? localStorage.getItem('uuid') : '',
    listOfUsersWithinTheOrg: state.firestore.ordered.usersWithinTheOrg
      ? state.firestore.ordered.usersWithinTheOrg
      : []
  };
};

const mapDispatchToProps = {};

//Styled Components
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    return [
      {
        collection: 'users',
        doc: `${props.uuid}`
      },
      {
        collection: 'users',
        where: [['arrayOfOrgsIds', 'array-contains', props.match.params.id]],
        storeAs: 'usersWithinTheOrg'
      },
      {
        collection: 'organisations',
        doc: props.match.params.id
      },
      {
        collection: 'spaces',
        where: [['orgId', '==', props.match.params.id]]
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
  background-color: #f64e49;
  color: white;
  border-radius: 15px;
  margin-left: 10px;
  border: none;
  font-size: 0.9rem;
`;

const Subheader = styled.div`
  font-size: 0.9rem;
  color: #bdc3c9;
  margin-top: 5px;
`;
const StyledMainHeader = styled.div`
  font-size: 24px;
  color: rgb(55, 71, 80);
  font-family: 'Open Sans', sans-serif;
  text-align: center;
`;

const StyledHeaderContainer = styled.div`
  display: flex;

  flex-direction: column;
  margin-top: 30px;
  .ui.header {
    margin: 0;
  }
`;

const StyledModalCard = styled.div`
  background-color: white;
  margin-top: 30px;
  border-radius: 5px;
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
  &:focus {
    border-bottom: 2px solid #00bc98;
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
  background-color: #00bc98;
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
    color: #00bc98;
    background-color: white;
    border: 2px solid #00bc98;
  }
`;

const StyledModalAdder = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #00bc98;
  cursor: pointer;
`;
