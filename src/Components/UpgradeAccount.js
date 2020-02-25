import React from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import styled from 'styled-components';

//Import components
import ScreenHeading from './reusable-components/ScreenHeading';
import ScreenSectionHeading from './reusable-components/ScreenSectionHeading';
import CheckoutFormContainer from './CheckoutFormContainer';
import Navbar from './NavBar';
import RightSidebar from './RightSidebar';

import { showModal } from '../redux/actions/actionCreators';
// import CreateThreadModal from './Modals/CreateThreadModal';

//Main component
export class UpgradeAccount extends React.Component {
  render() {
    if (this.props.currentOrg.isPremium) {
      return (
        <StyledMain>
          <Navbar {...this.props} />
          <StyledMainScreen>
            <StyledFirstRow>
              {this.props.activeOrg && this.props.currentOrg && (
                <ScreenHeading
                  heading={this.props.currentOrg.orgName}
                  info="Organization billing overview"
                />
              )}
            </StyledFirstRow>
            <StyledThreadContainerPremium>
              <ScreenSectionHeading heading="This organisation is on the PREMIUM plan" />
              <div>
                We hope you are enjoying the full benefits of your premium plan.
                Please contact customer service for any further special
                requirements.
              </div>
            </StyledThreadContainerPremium>
          </StyledMainScreen>
          <RightSidebar />
        </StyledMain>
      );
    }
    return (
      <StyledMain aria-label="Free Plan">
        <Navbar {...this.props} />
        <StyledMainScreen>
          <StyledFirstRow>
            {this.props.activeOrg && this.props.currentOrg && (
              <ScreenHeading
                heading={this.props.currentOrg.orgName}
                info="Organization billing overview"
              />
            )}
          </StyledFirstRow>
          <StyledThreadContainer>
            <ScreenSectionHeading heading="Currently on the FREE plan" />
            <ul>
              <li>Store more than the most recent 150 threads</li>
              <li>Invite more employees to your organisation</li>
              <li>used 0GB of space -- 5.00GB remaining</li>
            </ul>
            <CheckoutFormContainer currentOrg={this.props.currentOrg} />
          </StyledThreadContainer>
        </StyledMainScreen>
        <RightSidebar />
      </StyledMain>
    );
  }
}

//Export component wrapped in store + firestore
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    activeModal: state.modal.activeModal,
    activeOrg: localStorage.getItem('activeOrg')
      ? localStorage.getItem('activeOrg')
      : '',
    currentOrg: state.firestore.ordered.currentOrg
      ? state.firestore.ordered.currentOrg[0]
      : ''
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ showModal }, dispatch);
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    return [
      {
        collection: 'organisations',
        doc: `${props.match.params.id}`,
        storeAs: 'currentOrg'
      }
    ];
  })
)(UpgradeAccount);

//Styling
const StyledMain = styled.div`
  display: flex;
  width: 100vw;
`;

const StyledMainScreen = styled.div`
  background-color: #faf9f7;
  min-height: 100vh;
  width: 70%;
  padding: 10vh 5%;
  margin-left: 309px;
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
`;

const StyledThreadContainerPremium = styled.div`
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 120px;
  margin: 25px 0;
  border-radius: 10px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.06);
  font-family: 'Open Sans', Helvetica, Arial, 'sans-serif';
`;
