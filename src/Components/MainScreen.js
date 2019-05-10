import React from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import styled from 'styled-components';

//Import icons/images
import penIconWhite from '../images/icon-pen-white.svg';
// import placeholder from '../images/placeholder-homescreen.svg';

//Import components
import ScreenHeading from './reusable-components/ScreenHeading';
import ScreenSectionHeading from './reusable-components/ScreenSectionHeading';
import ScreenButton from './reusable-components/ScreenButton';
import ThreadCard from './reusable-components/ThreadCard';
// import Placeholder from './reusable-components/Placeholder';

import { showModal } from '../redux/actions/actionCreators';
import CreateThreadModal from './Modals/CreateThreadModal';

//Main component
class MainScreen extends React.Component {
  render() {
    return (
      <StyledMainScreen>
        {this.props.activeModal === 'CreateThreadModal' && (
          <CreateThreadModal
            shoudlBeOpen={true}
            showModal={this.props.showModal}
            activeModal={this.props.activeModal}
          />
        )}
        <StyledFirstRow>
          <ScreenHeading heading='Home' info='Catch up on the most recent threads.' />
          <ScreenButton
            content='Start a thread'
            icon={penIconWhite}
            backgroundColor='#5C4DF2'
            color='white'
            border='none'
            onClick={(e) => {
              console.log('clic');
              console.log(this.props);
              this.props.showModal('CreateThreadModal');
            }}
          />
        </StyledFirstRow>
        <ScreenSectionHeading heading='Recent' />

        {/*If not threads, show placeholder - IT RENDERS PLACEHOLDER FOR A SECOND WHEN RENDERING THREADS*/}
        {/*WE NEED TO FIGURE OUT THE LOGIC, BUT FOR NOW IT IS GOING TO BE COMMENTED OUT*/}
        {/* {props.threads.length === 0 && (
        <Placeholder
          heading="Learn about Home"
          info="Home is a great place where you find all information about active threads and current discussion. Be allways on the top of the things!"
          image={placeholder}
        />
      )} */}

        {/*Loop trough all the threads that are associated with the orgId*/}
        {/*OrgId is hardcoded -> we will need to fix this when we get id from logged in user*/}
        {this.props.threads.length > 0 &&
          this.props.threads.map((t) => {
            let dateInfo = new Date(t.threadCreatedAt.seconds * 1000);
            let date = `${dateInfo.getMonth()}/${dateInfo.getDate()} ${dateInfo.getHours()}:${dateInfo.getMinutes()}`;
            return (
              <ThreadCard
                key={t.id}
                createdBy={t.threadCreatedByUserName}
                createdAt={date}
                spaceId={t.spaceId}
                threadId={t.id}
                heading={t.threadName}
                info={t.threadTopic}
                checked='true'
              />
            );
          })}
      </StyledMainScreen>
    );
  }
}

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

//Export component wrapped in store + firestore
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    activeModal: state.modal.activeModal,
    threads: state.firestore.ordered.threads ? state.firestore.ordered.threads : []
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ showModal }, dispatch);
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: 'threads',
        where: [ [ 'orgId', '==', '0a9694de-a83a-425d-b07e-94eca87b32ac' ] ]
      }
    ];
  })
)(MainScreen);
