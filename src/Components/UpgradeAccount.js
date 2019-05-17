import React from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import styled from 'styled-components';

//Import components
import ScreenHeading from './reusable-components/ScreenHeading';
import ScreenSectionHeading from './reusable-components/ScreenSectionHeading';

import { showModal } from '../redux/actions/actionCreators';
// import CreateThreadModal from './Modals/CreateThreadModal';

//Main component
class UpgradeAccount extends React.Component {
  render() {
    return (
      <StyledMainScreen>
        {/* This will be payment modal FROM STRIPE */}
        {/* {this.props.activeModal === 'CreateThreadModal' && (
          <CreateThreadModal
            shoudlBeOpen={true}
            showModal={this.props.showModal}
            activeModal={this.props.activeModal}
          />
        )} */}
        <StyledFirstRow>
          {this.props.activeOrg && this.props.currentOrg && (
            <ScreenHeading heading={this.props.currentOrg.orgName} info="Organization billing overview" />
          )}
        </StyledFirstRow>
        <StyledThreadContainer>
          <ScreenSectionHeading heading="Currently on the FREE plan" />
          <ul>
            <li>Store more than the most recent 150 threads</li>
            <li>Invite more employees to your organisation</li>
            <li>used 0GB of space -- 5.00GB remaining</li>
          </ul>
          <UpgradePlanButton onClick={e => {}}>
            <div>Upgrade Plan</div>
          </UpgradePlanButton>
        </StyledThreadContainer>
      </StyledMainScreen>
    );
  }
}

//Export component wrapped in store + firestore
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    activeModal: state.modal.activeModal,
    activeOrg: localStorage.getItem('activeOrg') ? localStorage.getItem('activeOrg') : '',
    currentOrg: state.firestore.ordered.currentOrg ? state.firestore.ordered.currentOrg[0] : ''
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ showModal }, dispatch);
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    return [
      {
        collection: 'organisations',
        doc: `${props.activeOrg}`,
        storeAs: 'currentOrg'
      }
    ];
  })
)(UpgradeAccount);

//Styling
const StyledMainScreen = styled.div`
  background-color: #faf9f7;
  min-height: 100vh;
  padding: 10vh 5%;
`;

const StyledFirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 5vh;
`;

const StyledThreadContainer = styled.div`
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 215px;
  margin: 25px 0;
  border-radius: 10px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.06);
  font-family: 'Open Sans', Helvetica, Arial, 'sans-serif';
    /* &:hover {
    border: 1px solid #5c4df2b3;
    cursor: pointer; */
  }
`;

const UpgradePlanButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 6px 15px;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  background-color: #5c4df2;
  color: white;
  border: none;
  &:focus {
    outline: none;
  }
  img {
    width: 1.1rem;
    margin-right: 5px;
  }
`;
