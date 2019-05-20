import React, { Component } from 'react';

import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';

//Import semantic components
import { Header, Modal, Dropdown, Message } from 'semantic-ui-react';

class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamEmailAddress: ['', '', '', ''],
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

  // updateSpaceToDatabase = () => {
  //   this.props.firestore.update(
  //     { collection: 'spaces', doc: this.props.space.id },
  //     {
  //       spaceName: this.state.spaceName,
  //       spaceTopic: this.state.spaceTopic,
  //       arrayOfUserIdsInSpace: this.state.idsInSpace
  //     }
  //   );
  // };
  // addSpaceToUsers = () => {
  //   this.state.idsInSpace.map(id => {
  //     return this.props.firestore.update(
  //       { collection: 'users', doc: id },
  //       {
  //         arrayOfSpaceIds: this.props.firestore.FieldValue.arrayUnion(this.props.space.id),
  //         arrayOfSpaceNames: this.props.firestore.FieldValue.arrayUnion(this.state.spaceName)
  //       }
  //     );
  //   });
  // };

  // removeSpaceFromUsers = () => {
  //   this.props.space.arrayOfUserIdsInSpace
  //     .filter(id => this.state.idsInSpace.indexOf(id) === -1)
  //     .map(id => {
  //       return this.props.firestore.update(
  //         { collection: 'users', doc: id },
  //         {
  //           arrayOfSpaceIds: this.props.firestore.FieldValue.arrayRemove(this.props.space.id),
  //           arrayOfSpaceNames: this.props.firestore.FieldValue.arrayRemove(this.state.spaceName)
  //         }
  //       );
  //     });
  // };

  // setIdsToState = (e, data) => {
  //   e.preventDefault();
  //   const { value } = data;
  //   this.setState({ idsInSpace: value });
  // };

  render() {
    const userArray = this.props.listOfUsersWithinTheOrg
      .filter(user => user.id !== this.props.uuid)
      .map(user => user.fullName);

    const userIdsOptions = this.props.listOfUsersWithinTheOrg
      .filter(user => user.id !== this.props.uuid)
      .map(user => ({
        key: user.id,
        text: user.fullName,
        value: user.id
      }));

    console.log(userArray);
    return (
      <Modal open={true} size="tiny">
        <StyledContainer>
          <div>
            <StyledMainHeader>Your team</StyledMainHeader>
          </div>
          <div>
            <Header as="h5">Active Members</Header>
            <Dropdown
              fluid
              multiple
              search
              selection
              defaultValue={userArray}
              options={userIdsOptions}
              onChange={this.setIdsToState}
            />
            <Header as="h5">Invite users</Header>
            <StyledModalCard>
              <Modal.Content>
                <StyledModalForm>
                  <StyledModalLabel className="heading">Email addresses</StyledModalLabel>
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
                      this.props.history.push('/homescreen');
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
          </div>
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
    user: state.firestore.ordered.users ? state.firestore.ordered.users : [],
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
const StyledInput = styled.input`
  width: 100%;
  height: 32px;
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #374750;
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
  padding: 25px 0;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 20px;
  .heading {
    padding-bottom: 40px;
  }
`;

const StyledModalLabel = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  padding-bottom: 10px;
  color: black;
  .ligther-font {
    font-size: 0.8rem;
    color: #bdc3c9;
  }
`;

const StyledModalInput = styled.input`
  width: 98%;
  border: none;
  border-bottom: 2px solid #bdc3c9;
  padding: 10px 0 5px 0;
  margin-bottom: 10px;
  &::placeholder {
    font-size: 1.2rem;
  }
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
