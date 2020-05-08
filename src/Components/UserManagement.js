import React, { useState, useEffect, useContext } from 'react';

import styled from 'styled-components';

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
  const {
    getUsersFromOrg,
    getOrgWithId,
    getSpacesWithOrg,
    updateDataWithDoc,
    firebase
  } = useContext(Context);

  const [teamEmailAddress, setTeamEmailAddress] = useState(['', '', '', '']);
  const [alert, setAlert] = useState(true);
  const [spaces, setSpaces] = useState([]);
  const [org, setOrg] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let getUsersUnsubscribe = getUsersFromOrg(setUsers, props.match.params.id);
    let getOrgUnsubscribe = getOrgWithId(setOrg, props.match.params.id);
    let getSpacesUnsubscribe = getSpacesWithOrg(
      setSpaces,
      props.match.params.id
    );
    return () => {
      getUsersUnsubscribe();
      getOrgUnsubscribe();
      getSpacesUnsubscribe();
    };
  }, [getUsersFromOrg, getOrgWithId, getSpacesWithOrg, props.match.params.id]);

  //Add email input when clicked on email
  const appendInput = () => {
    this.setState(prevState => ({
      teamEmailAddress: prevState.teamEmailAddress.concat([''])
    }));
  };

  //Add email to state
  const addEmail = (email, index) => {
    setTeamEmailAddress(pr =>
      pr.map((value, i) => {
        if (i === index) {
          return email;
        }
        return value;
      })
    );
  };

  const checkIfEmail = email => {
    let re = /(^$|^.*@.*\..*$)/;
    return re.test(email);
  };

  const removeOrgFromUser = id => {
    let request = {
      collection: 'users',
      docId: id,
      data: {
        arrayOfOrgsIds: firebase.firestore.FieldValue.arrayRemove(org.id),
        arrayOfOrgsNames: firebase.firestore.FieldValue.arrayRemove(org.orgName)
      }
    };
    updateDataWithDoc(request);
  };

  const removeUserFromOrg = (id, email) => {
    let request = {
      collection: 'organisations',
      docId: org.id,
      data: {
        arrayOfUsersEmails: firebase.firestore.FieldValue.arrayRemove(email),
        arrayOfUsersIds: firebase.firestore.FieldValue.arrayRemove(id)
      }
    };
    updateDataWithDoc(request);
  };

  const removeSpacesFromUser = id => {
    spaces.forEach(space => {
      let request = {
        collection: 'spaces',
        docId: space.id,
        data: {
          arrayOfUserIdsInSpace: firebase.firestore.FieldValue.arrayRemove(id)
        }
      };
      updateDataWithDoc(request).then(res => {
        let request = {
          collection: 'users',
          docId: id,
          data: {
            arrayOfSpaceIds: firebase.firestore.FieldValue.arrayRemove(
              space.id
            ),
            arrayOfSpaceNames: firebase.firestore.FieldValue.arrayRemove(
              space.spaceName
            )
          }
        };
        updateDataWithDoc(request);
      });
    });
  };

  const addUserEmailsToOrgDatabase = () => {
    let usersEmailsWithoutEmptyStrings = teamEmailAddress
      .filter(Boolean)
      .map(e => {
        return e;
      });

    usersEmailsWithoutEmptyStrings.forEach(email => {
      let request = {
        collection: 'organisations',
        docId: org.id,
        data: {
          arrayOfUsersEmails: firebase.firestore.FieldValue.arrayUnion(email)
        }
      };
      updateDataWithDoc(request);
    });
  };

  if (org.createdByUserId === localStorage.getItem('uuid')) {
    return (
      <Modal open={true} size="tiny">
        <StyledContainer>
          <StyledMainHeader>Your Team</StyledMainHeader>

          <div>
            {users.length > 1 && (
              <StyledHeaderContainer>
                <Header as="h5" className="first-heading">
                  Active Members
                </Header>
                <Subheader>
                  Be very careful when deleting users as this can't be undone.
                </Subheader>
              </StyledHeaderContainer>
            )}
            {users.length > 0 &&
              users
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
                      setAlert(false);
                      if (
                        org.arrayOfUsersEmails.length +
                          teamEmailAddress.filter(Boolean).length >
                          19 &&
                        org.isPremium === false
                      ) {
                        setAlert('subscription');
                      } else if (!teamEmailAddress.every(checkIfEmail)) {
                        setAlert('email');
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
  if (org.createdByUserId !== localStorage.getItem('uuid')) {
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

//Styled Components

export default UserManagement;

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
