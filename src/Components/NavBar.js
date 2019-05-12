import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import styled from 'styled-components';
import { Icon, Dropdown } from 'semantic-ui-react';
import { setActiveOrg, switchSpaces, resetSpace } from '../redux/actions/actionCreators';

import plusIcon from '../images/icon-plus-lightgray.svg';
import homeIcon from '../images/icon-home-lightgray.svg';
import { NavBarOrgDropdown } from './NavBarOrgDropdown';

export class NavBar extends Component {
  state = {
    uuid: ''
  };
  componentWillMount() {
    this.setState({ uuid: localStorage.getItem('uuid') });
  }

  handleLogOut = async () => {
    await this.props.firebase.logout();
    this.props.clearFirestore();
    localStorage.clear();
  };

  setSelectedOrgToRedux = (e, data) => {
    e.preventDefault();
    const { value } = data;
    this.props.setActiveOrg(value);
    this.props.resetSpace();
  };

  render() {
    const activeUser = this.props.user;
    const { spacesForActiveOrg, orgsFromArrayOfUsersIds, orgsFromArrayOfAdminsIds } = this.props;
    const allOrgsForUser = [...orgsFromArrayOfUsersIds, ...orgsFromArrayOfAdminsIds];
    const orgOptions = allOrgsForUser.map(org => ({
      key: org.orgName,
      text: org.orgName,
      value: `${org.id}`
    }));
    const isOrgsLoaded = orgsFromArrayOfUsersIds.length > 0 || orgsFromArrayOfAdminsIds.length > 0;
    const userOptions = [
      {
        key: activeUser.fullName,
        text: activeUser.fullName,
        value: activeUser.fullName
      },
      {
        key: 'Log out',
        text: 'Log out',
        value: 'Log out'
      }
    ];
    return (
      <NavBarContainer>
        <HeaderContainer>
          <InnerContainerHorizontal>
            {activeUser.profileUrl && <StyledImage src={activeUser.profileUrl} alt="user" />}
            {activeUser.fullName && (
              <div>
                {' '}
                <Dropdown
                  inline
                  basic={true}
                  options={userOptions}
                  defaultValue={activeUser.fullName}
                  onChange={this.handleLogOut}
                />
              </div>
            )}
          </InnerContainerHorizontal>
          <div>
            <Icon name="cog" />
          </div>
        </HeaderContainer>
        <InnerContainer>
          <HomeContainer>
            <img src={homeIcon} alt="home icon" />
            <span onClick={this.props.resetSpace}>Home</span>
          </HomeContainer>

          <div>
            <div>
              <OuterOrgContainer>
                <OrgContainer>
                  <Icon name="building outline" size="large" />
                  {isOrgsLoaded && (
                    <NavBarOrgDropdown
                      setActiveOrg={this.props.setActiveOrg}
                      orgOptions={orgOptions}
                      setSelectedOrgToRedux={this.setSelectedOrgToRedux}
                    />
                    //********************************************** */
                  )}
                </OrgContainer>
                <div>
                  <img src={plusIcon} alt="plus icon" />
                </div>
              </OuterOrgContainer>
              <SpaceContainer>
                {spacesForActiveOrg && (
                  <div>
                    {spacesForActiveOrg.map((space, index) => (
                      <div key={index}>
                        <span onClick={() => this.props.switchSpaces(space.id)}>{space.spaceName}</span>
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
  }
}

const mapStateToProps = state => {
  return {
    user: state.firestore.ordered.users ? state.firestore.ordered.users[0] : [],
    orgsFromArrayOfUsersIds: state.firestore.ordered.orgsInWhichUser ? state.firestore.ordered.orgsInWhichUser : [],
    orgsFromArrayOfAdminsIds: state.firestore.ordered.orgsInWhichAdmin ? state.firestore.ordered.orgsInWhichAdmin : [],
    spacesForActiveOrg: state.firestore.ordered.spaces ? state.firestore.ordered.spaces : [],
    activeOrg: state.activeOrg.activeOrg,
    uuid: localStorage.getItem('uuid') ? localStorage.getItem('uuid') : ''
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      clearFirestore: () => dispatch({ type: '@@reduxFirestore/CLEAR_DATA' }),
      setActiveOrg,
      switchSpaces,
      resetSpace
    },
    dispatch
  );
};

//Connect to Firestore
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    // if (!this.state.uuid) return []; <-- empty array if no this.state.uuid in local storage
    return [
      {
        collection: 'users',
        doc: `${props.uuid}`
      },
      {
        collection: 'spaces',
        where: [['arrayOfUserIdsInSpace', 'array-contains', props.uuid], ['orgId', '==', props.activeOrg]]
      },
      {
        collection: 'organisations',
        where: ['arrayOfUsersIds', 'array-contains', props.uuid],
        storeAs: 'orgsInWhichUser'
      },
      {
        collection: 'organisations',
        where: ['arrayOfAdminsIds', 'array-contains', props.uuid],
        storeAs: 'orgsInWhichAdmin'
      }
    ];
  })
)(NavBar);

const HeaderContainer = styled.div`
  padding-left: 32px;
  padding-right: 32px;
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

const HomeContainer = styled.div`
  padding-left: 4px;
  position: relative;
  display: flex;
  align-items: baseline;
  img {
    width: 1.25rem;
    /* margin-right: 7px;
    margin-left: 4px; */
    position: absolute;
    right: 249px;
    bottom: 4px;
    &:hover {
      cursor: pointer;
    }
  }
  span {
    padding-left: 41px;
  }
  span:hover {
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
  align-items: baseline;
  color: rgb(55, 71, 80);
  font-size: 14px;
  font-weight: 600;
  span {
    padding-right: 8px;
    padding-left: 12px;
  }
  &:hover {
    cursor: pointer;
    border-radius: 16px;
    box-shadow: 3px 3px 13px -10px #000;
    .chevron {
      color: #f64e49;
    }
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
    margin-right: 20px;
    &:hover {
      cursor: pointer;
    }
  }
`;

const SpaceContainer = styled.div`
  margin-left: 8px;
  line-height: 30px;
  span {
    margin-left: 40px;
    &:hover {
      color: #f64e49;
      cursor: pointer;
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
