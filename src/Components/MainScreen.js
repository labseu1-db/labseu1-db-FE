import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

//Import icons/images
import penIconWhite from '../images/icon-pen-white.svg';

//Import components
import ScreenHeading from './reusable-components/ScreenHeading';
import ScreenSectionHeading from './reusable-components/ScreenSectionHeading';
import ScreenButton from './reusable-components/ScreenButton';
import ThreadCard from './reusable-components/ThreadCard';

//Main component
function MainScreen(props) {
  console.log(props.threads);
  return (
    <StyledMainScreen>
      <StyledFirstRow>
        <ScreenHeading heading="Home" info="Catch up on the most recent threads." />
        <ScreenButton content="Start a thread" icon={penIconWhite} backgroundColor="#5C4DF2" color="white" border="none" />
      </StyledFirstRow>
      <ScreenSectionHeading heading="Recent" />
      {props.threads.length &&
        props.threads.map(t => {
          let dateInfo = new Date(t.threadCreatedAt.seconds * 1000);
          let date = `${dateInfo.getMonth()}/${dateInfo.getDate()} ${dateInfo.getHours()}:${dateInfo.getMinutes()}`;
          return <ThreadCard key={t.id} createdBy={t.threadCreatedByUserName} createdAt={date} spaceId={t.spaceId} threadId={t.id} heading={t.threadName} info={t.threadTopic} checked="true" />;
        })}
    </StyledMainScreen>
  );
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
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    threads: state.firestore.ordered.threads ? state.firestore.ordered.threads : []
  };
};

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    return [
      {
        collection: 'threads',
        where: [['orgId', '==', 'f61a149b-6530-4ae1-b953-84b899ffc646']]
      }
    ];
  })
)(MainScreen);
