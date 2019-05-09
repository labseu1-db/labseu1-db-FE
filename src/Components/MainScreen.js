import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

//Import icons/images
import penIconWhite from '../images/icon-pen-white.svg';
import placeholder from '../images/placeholder-homescreen.svg';

//Import components
import ScreenHeading from './reusable-components/ScreenHeading';
import ScreenSectionHeading from './reusable-components/ScreenSectionHeading';
import ScreenButton from './reusable-components/ScreenButton';
import ThreadCard from './reusable-components/ThreadCard';

//Main component
function MainScreen(props) {
  return (
    <StyledMainScreen>
      <StyledFirstRow>
        <ScreenHeading heading="Home" info="Catch up on the most recent threads." />
        <ScreenButton content="Start a thread" icon={penIconWhite} backgroundColor="#5C4DF2" color="white" border="none" />
      </StyledFirstRow>
      <ScreenSectionHeading heading="Recent" />

      {/*If not threads, show placeholder */}
      {/* {props.threads.length === 0 && (
        <StyledPlaceholderContainer>
          <StyledPlaceholderHeading>Learn about Home</StyledPlaceholderHeading>
          <StyledPlaceholderInfo>Home is a great place where you fins all information about threads.</StyledPlaceholderInfo>
          <StyledPlaceholderImage>
            <img src={placeholder} alt="placeholder" />
          </StyledPlaceholderImage>
        </StyledPlaceholderContainer>
      )} */}

      {/*Loop trough all the threads that are associated with the orgId*/}
      {/*OrgId is hardcoded -> we will need to fix this when we get id from logged in user*/}
      {props.threads.length > 0 &&
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

const StyledPlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
`;
const StyledPlaceholderImage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 50px;
  img {
    width: 40%;
  }
`;
const StyledPlaceholderHeading = styled.div`
  width: 100%;
  color: white;
  line-height: 2.5;
  padding: 0 20px;
  background-color: #5c4df2;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 10px 10px 0 0;
`;

const StyledPlaceholderInfo = styled.div`
  width: 100%;
  color: black;
  background-color: #e6e5fe;
  height: 100px;
  padding: 20px;
  border-radius: 0 0 10px 10px;
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
        where: [['orgId', '==', '0a9694de-a83a-425d-b07e-94eca87b32ac']]
      }
    ];
  })
)(MainScreen);
