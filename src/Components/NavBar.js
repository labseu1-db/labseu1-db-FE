import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import styled from 'styled-components';
import { Redirect, Link } from 'react-router-dom';

//Import actions
import {
  showModal,
  resetThread,
  setActiveOrg,
  switchSpaces,
  resetSpace,
  showUpgradeScreen,
  resetUpgradeScreen,
  editingProfileDone,
  notRenderProfile,
  renderProfile,
  showFollowUp,
  hideFollowUp
} from '../redux/actions/actionCreators';

//Import semantic components
import { Dropdown } from 'semantic-ui-react';

//Import components
import Spinner from './semantic-components/Spinner';
import { NavBarOrgDropdown } from './NavBarOrgDropdown';
import CreateNewSpaceModal from './Modals/CreateNewSpaceModal';
import AvatarFromLetter from './reusable-components/AvatarFromLetter';

//Import icons
import homeIcon from '../images/icon-home-lightgray.svg';

import clipboardIcon from '../images/icon-clipboard-lightgray.svg';
import discIcon from '../images/icon-disc-darkgray.svg';
import peopleIcon from '../images/icon-people-lightgray.svg';

const NavBar = props => {
  // state = {
  //   profileDropdown: '',
  //   highlightedHome: false,
  //   highlightedFollowUp: false,
  //   : ''
  // };

  const [profileDropdown, setProfileDropdown] = useState('');
  const [highlightedHome, setHighlightedHome] = useState(false);
  const [highlightedFollowUp, setHighlightedFollowUp] = useState(false);

  // componentDidMount() {
  //   let result = props.spacesForActiveOrg.every(space => {
  //     return space.orgId === props.match.params.id;
  //   });
  //   if (!result) {
  //     window.location.reload();
  //   }
  // }

  const handleLogOut = () => {
    props.firebase
      .logout()
      .then(() => {
        props.clearFirestore();
      })
      .then(() => {
        localStorage.clear();
        props.history.push('/login');
      })
      .catch(err => console.log("something's wrong."));

    // props.history.push("/login");
  };

  const handleDropDownChange = (e, { name, value }) => {
    setProfileDropdown(value, () => {
      if (profileDropdown === 'Log out') {
        handleLogOut();
      } else if (profileDropdown === 'Upgrade Account') {
        props.history.push(`/upgrade/${props.match.params.id}`);
      } else if (profileDropdown === 'Profile') {
        props.history.push(`/profile/${props.match.params.id}`);
      }
    });
  };

  const setSelectedOrgToLocalStorage = (e, data) => {
    e.preventDefault();
    return props.history.push(`/mainscreen/${data.value}`);
  };

  const highlightHome = () => {
    setHighlightedHome(true);
    setHighlightedFollowUp(false);
  };

  const highlightFollowUp = () => {
    setHighlightedFollowUp(true);
    setHighlightedHome(false);
  };

  const clearHighlightedNav = () => {
    setHighlightedHome(false);
    setHighlightedFollowUp(false);
  };

  //Will load spinner if user doesn't exist
  if (
    isEmpty(
      props.user || props.orgsFromArrayOfUsersIds || props.spacesForActiveOrg
    )
  ) {
    return <Spinner />;
  }
  if (props.user.id === props.uuid) {
    const { spacesForActiveOrg, orgsFromArrayOfUsersIds } = props;
    // const allOrgsForUser = [...orgsFromArrayOfUsersIds, ...orgsFromArrayOfAdminsIds];
    const orgOptions = orgsFromArrayOfUsersIds.map(org => ({
      key: org.orgName,
      text: org.orgName,
      value: `${org.id}`
    }));
    // const isOrgsLoaded = orgsFromArrayOfUsersIds.length > 0;
    const userOptions = [
      {
        key: 'Profile',
        text: 'Profile',
        value: 'Profile'
      },
      {
        key: 'Create Organisation',
        text: 'Create Organisation',
        value: 'Create Organisation'
      },
      {
        key: 'Upgrade Account',
        text: 'Upgrade Account',
        value: 'Upgrade Account'
      },
      {
        key: 'Log out',
        text: 'Log out',
        value: 'Log out'
      }
    ];
    if (profileDropdown === 'Create Organisation') {
      return <Redirect to="/createneworganisation" />;
    }
    return (
      <NavBarContainer>
        <HeaderContainer>
          <InnerContainerHorizontal>
            {props.user.fullName && (
              <AvatarFromLetter username={props.user.fullName} />
            )}
            {orgOptions && (
              //props.user.fullName
              <StyledDropdown>
                <Dropdown
                  inline
                  name={'profileDropdown'}
                  basic={true}
                  options={userOptions}
                  text={props.user.fullName}
                  onChange={handleDropDownChange}
                />
              </StyledDropdown>
            )}
          </InnerContainerHorizontal>
          {/* <div>
              <Icon name="cog" />
            </div> */}
        </HeaderContainer>
        <InnerContainer>
          <RowContainer>
            <img src={homeIcon} alt="home icon" />
            <RowDiv
              style={
                props.match.path === '/mainscreen/:id'
                  ? { backgroundColor: '#fff0ea', color: 'rgb(55, 71, 80)' }
                  : {}
              }
              to={`/mainscreen/${props.match.params.id}`}
            >
              Home
            </RowDiv>
          </RowContainer>
          <RowContainer>
            <img src={clipboardIcon} alt="home icon" />
            <RowDiv
              style={
                props.match.path === '/follow-up/:id'
                  ? { backgroundColor: '#fff0ea', color: 'rgb(55, 71, 80)' }
                  : {}
              }
              to={`/follow-up/${props.match.params.id}`}
            >
              Follow up
            </RowDiv>
          </RowContainer>
          {localStorage.getItem('activeOrg') && (
            <RowContainer>
              <img src={peopleIcon} alt="users icon" />
              <RowDiv to={`/users/${props.match.params.id}`}>Users</RowDiv>
            </RowContainer>
          )}
          <div>
            <div>
              <OuterOrgContainer>
                <OrgContainer>
                  <img src={discIcon} alt="home icon" />

                  {props.match.params.id && (
                    <NavBarOrgDropdown
                      // setActiveOrg={props.setActiveOrg}
                      activeOrg={props.match.params.id}
                      orgOptions={orgOptions}
                      setSelectedOrgToLocalStorage={
                        setSelectedOrgToLocalStorage
                      }
                    />
                  )}
                </OrgContainer>
                <CreateNewSpaceModal {...props} />
              </OuterOrgContainer>
              <SpaceContainer>
                {spacesForActiveOrg && (
                  <div>
                    {spacesForActiveOrg.map((space, index) => (
                      <RowDiv
                        key={index}
                        style={
                          props.match.params.spaceId === space.id
                            ? {
                                backgroundColor: '#fff0ea',
                                color: 'rgb(55, 71, 80)'
                              }
                            : {}
                        }
                        to={`/mainscreen/${props.match.params.id}/${space.id}`}
                      >
                        {space.spaceName}
                      </RowDiv>
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
};

const mapStateToProps = state => {
  return {
    user: state.firestore.ordered.filteredUser
      ? state.firestore.ordered.filteredUser[0]
      : '',
    orgsFromArrayOfUsersIds: state.firestore.ordered.orgsInWhichUser
      ? state.firestore.ordered.orgsInWhichUser
      : [],
    // orgsFromArrayOfAdminsIds: state.firestore.ordered.orgsInWhichAdmin ? state.firestore.ordered.orgsInWhichAdmin : [],
    spacesForActiveOrg: state.firestore.ordered.filteredSpaces
      ? state.firestore.ordered.filteredSpaces
      : [],
    uuid: localStorage.getItem('uuid') ? localStorage.getItem('uuid') : '',
    // fullName: localStorage.getItem('fullName') ? localStorage.getItem('fullName') : '',
    activeModal: state.modal.activeModal
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      clearFirestore: () => dispatch({ type: '@@reduxFirestore/CLEAR_DATA' }),
      setActiveOrg,
      switchSpaces,
      resetSpace,
      resetThread,
      showModal,
      showUpgradeScreen,
      resetUpgradeScreen,
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
  firestoreConnect(props => {
    // if (!userDoc) return []; <-- empty array if no userDoc in local storage
    return [
      {
        collection: 'users',
        doc: props.uuid,
        storeAs: 'filteredUser'
      },
      {
        collection: 'spaces',
        where: [
          ['arrayOfUserIdsInSpace', 'array-contains', props.uuid],
          ['orgId', '==', props.match.params.id]
        ],
        storeAs: 'filteredSpaces'
      },
      {
        collection: 'organisations',
        where: ['arrayOfUsersIds', 'array-contains', props.uuid],
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
    background: #00bc98;
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

const RowDiv = styled(Link)`
  padding: 5px 12px;
  border-radius: 15px;
  color: black;
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
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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
  background-color: white;
  width: 309px;
  padding-top: 32px;
  font-family: 'Open Sans', Helvetica, Arial, 'sans-serif';
  color: #9c9c9c;
  font-size: 13px;
  position: fixed;
  left: 0;
  top: 0;
`;
