import React, { useEffect, useContext, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import styled from 'styled-components';

//Import icons/images
import penIconWhite from '../images/icon-pen-white.svg';

//Import components
import ScreenHeading from './reusable-components/ScreenHeading';
import ScreenSectionHeading from './reusable-components/ScreenSectionHeading';
import ScreenButton from './reusable-components/ScreenButton';
import ThreadCard from './reusable-components/ThreadCard';
import CreateThreadModal from './Modals/CreateThreadModal';
import NavBar from './NavBar';
import RightSidebar from './RightSidebar';

//Actions
import { showModal, setActiveThread } from '../redux/actions/actionCreators';

// Context
import Context from './ContextProvider/Context';

//Main component
const MainScreen = props => {
  const { getThreadsWithOrg } = useContext(Context);

  const [threads, setThreads] = useState([]);

  const setThreadsData = useCallback(async () => {
    let data = await getThreadsWithOrg(props.match.params.id);
    setThreads(data);
  }, [getThreadsWithOrg, props.match.params.id]);

  useEffect(() => {
    setThreadsData();
  }, [setThreadsData]);

  return (
    <StyledMain>
      <NavBar {...props} />
      <StyledMainScreen>
        {props.activeModal === 'CreateThreadModal' && (
          <CreateThreadModal
            shoudlBeOpen={true}
            showModal={props.showModal}
            setActiveThread={props.setActiveThread}
            activeModal={props.activeModal}
            {...props}
          />
        )}
        <StyledFirstRow>
          <ScreenHeading
            heading="Home"
            info="Catch up on the most recent threads."
          />
          <ScreenButton
            content="Start a thread"
            icon={penIconWhite}
            backgroundColor="#00bc98"
            color="white"
            border="none"
            onClick={e => {
              props.showModal('CreateThreadModal');
            }}
          />
        </StyledFirstRow>
        <ScreenSectionHeading heading="Recent" />

        {/*Loop trough all the threads that are associated with the orgId*/}
        {/*OrgId is hardcoded -> we will need to fix this when we get id from logged in user*/}
        {threads.length > 0 &&
          threads.map((t, i) => {
            let dateInfo = new Date(t.threadCreatedAt);
            let date = `${dateInfo.getMonth()}/${dateInfo.getDate()} ${dateInfo.getHours()}:${(
              '0' + dateInfo.getMinutes()
            ).slice(-2)}`;
            console.log(t);
            return (
              <ThreadCard
                key={t.id}
                createdBy={t.threadCreatedByUserName}
                createdAt={date}
                spaceId={t.spaceId}
                threadId={t.id}
                heading={t.threadName}
                info={t.threadTopic}
                isFollowUpDecided={
                  t.arrayOfUserIdsWhoFollowUp &&
                  t.arrayOfUserIdsWhoFollowUp.includes(props.uuid)
                    ? true
                    : false
                }
                checked={
                  (!t.whenUserHasSeen[localStorage.getItem('uuid')] &&
                    'false') ||
                  (t.lastCommentCreatedAt >
                  t.whenUserHasSeen[localStorage.getItem('uuid')]
                    ? 'false'
                    : 'true')
                }
                onClick={() => props.setActiveThread(t.id)}
              />
            );
          })}
      </StyledMainScreen>
      <RightSidebar />
    </StyledMain>
  );
};

//Styling
const StyledMainScreen = styled.div`
  background-color: #fff7f3;
  min-height: 100vh;
  padding: 10vh 5%;
  margin-left: 309px;
  width: 70%;
`;
const StyledMain = styled.div`
  display: flex;
  width: 100vw;
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
    threads: state.firestore.ordered.mainScreenThreads
      ? state.firestore.ordered.mainScreenThreads
      : [],
    activeModal: state.modal.activeModal
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ showModal, setActiveThread }, dispatch);
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    return [
      {
        collection: 'threads',
        where: [['orgId', '==', props.match.params.id]],
        orderBy: ['threadCreatedAt', 'desc'],
        storeAs: 'mainScreenThreads'
      }
    ];
  })
)(MainScreen);
