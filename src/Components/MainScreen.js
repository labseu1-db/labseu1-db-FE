import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';

//Import icons/images
import penIconWhite from '../images/icon-pen-white.svg';

// import Spinner
import Spinner from './semantic-components/Spinner';

//Import components
import ScreenHeading from './reusable-components/ScreenHeading';
import ScreenSectionHeading from './reusable-components/ScreenSectionHeading';
import ScreenButton from './reusable-components/ScreenButton';
import ThreadCard from './reusable-components/ThreadCard';
import CreateThreadModal from './Modals/CreateThreadModal';
import NavBar from './NavBar';
import RightSidebar from './RightSidebar';

// Context
import Context from './ContextProvider/Context';

//Main component
const MainScreen = props => {
  const {
    getThreadsWithOrg,
    setModal,
    modal,
    loading,
    redirect,
    useMountEffect,
    mountEffectFunction
  } = useContext(Context);

  const [threads, setThreads] = useState([]);

  // use Effect to set setLoading to false
  useMountEffect(mountEffectFunction);

  useEffect(() => {
    let getThreadsUnsubscribe = getThreadsWithOrg(
      setThreads,
      props.match.params.id
    );
    return () => {
      getThreadsUnsubscribe();
    };
  }, [getThreadsWithOrg, props.match.params.id]);

  return (
    <StyledMain aria-label="MainScreen">
      <NavBar {...props} />
      <MidRightContainer>
        <StyledMainScreen>
          {modal === 'CreateThreadModal' && (
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
                setModal('CreateThreadModal');
              }}
            />
          </StyledFirstRow>
          <ScreenSectionHeading heading="Recent" />

          {/*Loop trough all the threads that are associated with the orgId*/}
          {/*OrgId is hardcoded -> we will need to fix this when we get id from logged in user*/}
          {!loading ? (
            <div>
              {threads.length > 0 &&
                threads.map((t, i) => {
                  let dateInfo = new Date(t.threadCreatedAt);
                  let date = `${dateInfo.getMonth()}/${dateInfo.getDate()} ${dateInfo.getHours()}:${(
                    '0' + dateInfo.getMinutes()
                  ).slice(-2)}`;
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
                      onClick={() =>
                        redirect(
                          `/mainscreen/${props.match.params.id}/${t.spaceId}/${t.id}`
                        )
                      }
                    />
                  );
                })}
            </div>
          ) : (
            <div aria-label="Threads spinner">
              <Spinner />
            </div>
          )}
        </StyledMainScreen>
        <RightSidebar />
      </MidRightContainer>
    </StyledMain>
  );
};

const MidRightContainer = styled.div`
  display: flex;
  background-color: #fff7f3;
  width: 100vw;
`;

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

export default MainScreen;
