import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

import plusIcon from '../images/icon-plus-lightgray.svg';

// This userdoc will come from local storage (set on login)
const userDoc = '04d12a5c-aa73-4f14-a6ce-1ec6a85d78f5';

export class NavBar extends Component {
  render() {
    const activeUser = this.props.user;
    return (
      <NavBarContainer>
        <HeaderContainer>
          <InnerContainerHorizontal>
            {activeUser.profileUrl && (
              <StyledImage src={activeUser.profileUrl} alt='user' />
            )}
            {activeUser.fullName && <div>{activeUser.fullName}</div>}
            <Icon name='chevron down' size='small' />
          </InnerContainerHorizontal>
          <div>
            <button
              onClick={async e => {
                e.preventDefault();
                await this.props.firebase.logout();
                this.props.clearFirestore();
              }}
            >
              Logout
            </button>
            <Icon name='cog' />
          </div>
        </HeaderContainer>

        <InnerContainer>
          <HomeContainer>
            <Icon name='home' size='large' />
            <span>Home</span>
          </HomeContainer>

          <div>
            <div>
              <OuterOrgContainer>
                <OrgContainer>
                  <Icon name='building outline' size='large' />
                  {activeUser.arrayOfOrgs && (
                    <span>{activeUser.arrayOfOrgs[0].orgName}</span>
                  )}
                  <Icon name='chevron down' size='small' />
                </OrgContainer>
                <div>
                  <img src={plusIcon} alt='plus icon' />
                </div>
              </OuterOrgContainer>
              <SpaceContainer>
                {activeUser.arrayOfSpaceNames && (
                  <div>
                    {activeUser.arrayOfSpaceNames.map((space, index) => (
                      <div key={index}>
                        <span>{space}</span>
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
    user: state.firestore.ordered.users ? state.firestore.ordered.users[0] : []
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearFirestore: () => dispatch({ type: '@@reduxFirestore/CLEAR_DATA' })
  };
};

//Connect to Firestore
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    return [
      {
        collection: 'users',
        doc: `${userDoc}`
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
    /* box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.1); */
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
  display: flex;
  align-items: baseline;
  span {
    padding-left: 12px;
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
  border: 1px solid pink;
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
