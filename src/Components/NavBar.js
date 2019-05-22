import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

//Import actions
import {
  showModal,
  resetThread,
  setActiveOrg,
  switchSpaces,
  resetSpace,
  editingProfileDone,
  notRenderProfile,
  renderProfile,
  showFollowUp,
  hideFollowUp
} from '../redux/actions/actionCreators';

//Import semantic components
import { Icon, Dropdown } from 'semantic-ui-react';

//Import components
import Spinner from './semantic-components/Spinner';
import { NavBarOrgDropdown } from './NavBarOrgDropdown';
import CreateNewSpaceModal from './Modals/CreateNewSpaceModal';

//Import icons
import homeIcon from '../images/icon-home-lightgray.svg';

import clipboardIcon from '../images/icon-clipboard-lightgray.svg';
import discIcon from '../images/icon-disc-darkgray.svg';
import peopleIcon from '../images/icon-people-lightgray.svg';

export class NavBar extends Component {
  state = {
    profileDropdown: ''
  };

  handleLogOut = () => {
    this.props.firebase
      .logout()
      .then(() => {
        this.props.clearFirestore();
      })
      .then(() => {
        localStorage.clear();
      })
      .catch((err) => console.log("something's wrong."));

    this.props.history.push('/login');
  };

  handleDropDownChange = (e, { name, value }) => {
    this.setState({ [name]: value }, () => {
      if (this.state.profileDropdown === 'Log out') {
        this.handleLogOut();
      }
      if (this.state.profileDropdown === 'Profile') {
        this.props.renderProfile();
      }
      if (this.state.profileDropdown !== 'Profile') {
        this.props.showModal(null);
        this.props.notRenderProfile();
        this.props.editingProfileDone();
      }
    });
    this.props.hideFollowUp();
    this.props.resetSpace();
    this.props.resetThread();
  };

  setSelectedOrgToLocalStorage = (e, data) => {
    e.preventDefault();
    const { value } = data;
    localStorage.setItem('activeOrg', value);
    this.props.resetSpace();
    this.props.notRenderProfile();
    this.props.hideFollowUp();
  };

  generateDropdownOptions = () => {};
  render() {
    //Will load spinner if user doesn't exist
    if (isEmpty(this.props.user || this.props.orgsFromArrayOfUsersIds || this.props.spacesForActiveOrg)) {
      return <Spinner />;
    }
    if (this.props.user.id === this.props.uuid) {
      const { spacesForActiveOrg, orgsFromArrayOfUsersIds } = this.props;
      // const allOrgsForUser = [...orgsFromArrayOfUsersIds, ...orgsFromArrayOfAdminsIds];
      const orgOptions = orgsFromArrayOfUsersIds.map((org) => ({
        key: org.orgName,
        text: org.orgName,
        value: `${org.id}`
      }));
      // const isOrgsLoaded = orgsFromArrayOfUsersIds.length > 0;
      const userOptions = [
        {
          key: 'Create Organisation',
          text: 'Create Organisation',
          value: 'Create Organisation'
        },
        {
          key: 'Log out',
          text: 'Log out',
          value: 'Log out'
        }
      ];
      if (this.state.profileDropdown === 'Create Organisation') {
        return <Redirect to='/createneworganisation' />;
      }

      if (this.state.profileDropdown === 'Create Organisation') {
        return <Redirect to='/createneworganisation' />;
      }

      return (
        <NavBarContainer>
          <HeaderContainer>
            <InnerContainerHorizontal>
              {this.props.user.profileUrl && <StyledImage src={this.props.user.profileUrl} alt='user' />}
              {orgOptions && (
                //this.props.user.fullName
                <StyledDropdown>
                  <Dropdown
                    inline
                    name={'profileDropdown'}
                    basic={true}
                    options={userOptions}
                    text={this.props.user.fullName}
                    onChange={this.handleDropDownChange}
                  />
                </StyledDropdown>
              )}
            </InnerContainerHorizontal>
            <div>
              <Icon name='cog' />
            </div>
          </HeaderContainer>
          <InnerContainer>
            <RowContainer>
              <img src={homeIcon} alt='home icon' />
              <div
                className='text'
                onClick={() => {
                  this.props.showModal(null);
                  this.props.editingProfileDone();
                  this.props.resetSpace();
                  this.props.resetThread();
                  this.props.notRenderProfile();
                  this.props.hideFollowUp();
                }}
              >
                Home
              </div>
            </RowContainer>
            <RowContainer>
              <img src={clipboardIcon} alt='home icon' />
              <div
                className='text'
                onClick={() => {
                  this.props.showFollowUp();
                  this.props.resetSpace();
                  this.props.resetThread();
                }}
              >
                Follow up
              </div>
            </RowContainer>
            {localStorage.getItem('activeOrg') && (
              <RowContainer>
                <img src={peopleIcon} alt='users icon' />
                <div
                  onClick={() => {
                    this.props.resetSpace();
                    this.props.resetThread();
                    this.props.props.history.push('/users');
                  }}
                >
                  Users
                </div>
              </RowContainer>
            )}
            <div>
              <div>
                <OuterOrgContainer>
                  <OrgContainer>
                    <img src={discIcon} alt='home icon' />

                    {this.props.activeOrg && (
                      <NavBarOrgDropdown
                        // setActiveOrg={this.props.setActiveOrg}
                        activeOrg={this.props.activeOrg}
                        orgOptions={orgOptions}
                        setSelectedOrgToLocalStorage={this.setSelectedOrgToLocalStorage}
                      />
                      //********************************************** */
                    )}
                  </OrgContainer>
                  <CreateNewSpaceModal {...this.props} />
                </OuterOrgContainer>
                <SpaceContainer>
                  {spacesForActiveOrg && (
                    <div>
                      {spacesForActiveOrg.map((space, index) => (
                        <div key={index}>
                          <div
                            onClick={(event) => {
                              event.preventDefault();
                              this.props.editingProfileDone();
                              this.props.resetThread();
                              this.props.switchSpaces(space.id);
                              this.props.showModal(null);
                              this.props.notRenderProfile();
                              this.props.hideFollowUp();
                            }}
                          >
                            {space.spaceName}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </SpaceContainer>
              </div>
            </div>
          </InnerContainer>
        </NavBarContainer>
      );
    } else {
      return <Spinner />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.firestore.ordered.filteredUser ? state.firestore.ordered.filteredUser[0] : '',
    orgsFromArrayOfUsersIds: state.firestore.ordered.orgsInWhichUser ? state.firestore.ordered.orgsInWhichUser : [],
    // orgsFromArrayOfAdminsIds: state.firestore.ordered.orgsInWhichAdmin ? state.firestore.ordered.orgsInWhichAdmin : [],
    spacesForActiveOrg: state.firestore.ordered.filteredSpaces ? state.firestore.ordered.filteredSpaces : [],
    uuid: localStorage.getItem('uuid') ? localStorage.getItem('uuid') : '',
    activeOrg: localStorage.getItem('activeOrg') ? localStorage.getItem('activeOrg') : '',
    // fullName: localStorage.getItem('fullName') ? localStorage.getItem('fullName') : '',
    activeModal: state.modal.activeModal
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      clearFirestore: () => dispatch({ type: '@@reduxFirestore/CLEAR_DATA' }),
      setActiveOrg,
      switchSpaces,
      resetSpace,
      resetThread,
      showModal,
      editingProfileDone,
      renderProfile,
      notRenderProfile,
      showFollowUp,
      hideFollowUp
    },
    dispatch
  );
};

//Connect to Firestore
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    // if (!userDoc) return []; <-- empty array if no userDoc in local storage
    return [
      {
        collection: 'users',
        doc: `${props.uuid}`,
        storeAs: 'filteredUser'
      },
      {
        collection: 'spaces',
        where: [ [ 'arrayOfUserIdsInSpace', 'array-contains', props.uuid ], [ 'orgId', '==', props.activeOrg ] ],
        storeAs: 'filteredSpaces'
      },
      {
        collection: 'organisations',
        where: [ 'arrayOfUsersIds', 'array-contains', props.uuid ],
        storeAs: 'orgsInWhichUser'
      }
      // {
      //   collection: 'organisations',
      //   where: ['arrayOfAdminsIds', '==', props.uuid],
      //   storeAs: 'orgsInWhichAdmin'
      // }
    ];
  })
)(NavBar);

const HeaderContainer = styled.div`
  padding-left: 32px;
  padding-right: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div:nth-child(2) {
    &:hover {
      cursor: pointer;
    }
  }
`;

const StyledDropdown = styled.div`
  .ui.dropdown .menu .item:hover {
    background: #5c4df2;
    color: white;
  }
  .item {
    margin: 5px;
    border-radius: 5px;
  }
`;

const InnerContainerHorizontal = styled.div`
  display: flex;
  align-items: center;
  div {
    margin-right: 8px;
  }
  &:hover {
    cursor: pointer;
    font-weight: 600;
    box-shadow: 3px 3px 13px -10px #000;
    border-radius: 16px;
    .chevron {
      color: #f64e49;
    }
  }
  div {
    color: rgb(55, 71, 80);
  }
`;

const InnerContainer = styled.div`
  padding-top: 40px;
  padding-left: 32px;
  padding-bottom: 16px;
`;

const RowContainer = styled.div`
  padding-left: 4px;
  margin: 15px 0;
  position: relative;
  display: flex;

  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  img {
    width: 1.25rem;
    margin-right: 15px;
  }
  div:hover {
    color: #f64e49;
    cursor: pointer;
  }
`;

const OrgContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 8px;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(55, 71, 80);
  font-size: 13px;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    border-radius: 16px;
    box-shadow: 3px 3px 13px -10px #000;
  }
`;

const OuterOrgContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  div:nth-child(2) {
    display: flex;
    align-items: flex-end;
  }
  img {
    width: 1.25rem;
    margin-right: 8px;
    margin-right: 15px;
    &:hover {
      cursor: pointer;
    }
  }
`;

const SpaceContainer = styled.div`
  line-height: 30px;
  margin-left: 40px;
  div {
    div {
      &:hover {
        color: #f64e49;
        cursor: pointer;
      }
    }
  }
`;

const NavBarContainer = styled.div`
  height: 100vh;
  width: 309px;
  padding-top: 32px;
  font-family: 'Open Sans', Helvetica, Arial, 'sans-serif';
  color: #9c9c9c;
  font-size: 13px;
`;

const StyledImage = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  margin-right: 8px;
`;
