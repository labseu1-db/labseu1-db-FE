import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { Dropdown } from 'semantic-ui-react';

//Import icons
import penIconWhite from '../images/icon-pen-white.svg';

//Import components
import ScreenHeading from './reusable-components/ScreenHeading';
import ScreenSectionHeading from './reusable-components/ScreenSectionHeading';
import ScreenButton from './reusable-components/ScreenButton';
import ThreadCard from './reusable-components/ThreadCard';
import NavBar from './NavBar';
import RightSidebar from './RightSidebar';

//Import Modals
import CreateThreadModal from './Modals/CreateThreadModal';
import EditSpaceModal from './Modals/EditSpaceModal';
import DeleteSpaceModal from './Modals/DeleteSpaceModal';
import LeaveSpaceModal from './Modals/LeaveSpaceModal';

// Context API
import Context from './ContextProvider/Context';

const SpaceThreads = props => {
  // Context
  const { getSpaceWithId, modal, setModal, getThreadsWithSpace } = useContext(
    Context
  );
  const [space, setSpace] = useState('');
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    getThreadsWithSpace(setThreads, props.match.params.spaceId);
    getSpaceWithId(setSpace, props.match.params.spaceId);
  }, [getSpaceWithId, getThreadsWithSpace, props.match.params.spaceId]);

  if (!space) {
    return (
      <StyledErrorScreen>
        <StyleErrorMessage>Space doesn't exist: 404</StyleErrorMessage>
        <ScreenButton
          content="Go back to Home"
          icon={penIconWhite}
          backgroundColor="#00bc98"
          color="white"
          border="none"
          onClick={() =>
            props.history.push(`/mainscreen/${props.match.params.id}`)
          }
        />
      </StyledErrorScreen>
    );
  } else {
    return (
      <StyledMain>
        <NavBar {...props} />
        <MidRightContainer>
          <StyledMainScreen>
            {modal === 'CreateThreadModal' && (
              <CreateThreadModal
                shoudlBeOpen={true}
                showModal={props.showModal}
                activeModal={props.activeModal}
                setActiveThread={props.setActiveThread}
                {...props}
              />
            )}
            {modal === 'EditSpaceModal' && (
              <EditSpaceModal
                shoudlBeOpen={true}
                activeModal={props.activeModal}
                space={props.space}
                {...props}
              />
            )}
            {modal === 'DeleteSpaceModal' && (
              <DeleteSpaceModal
                shoudlBeOpen={true}
                activeModal={props.activeModal}
                space={props.space}
                {...props}
              />
            )}
            {modal === 'LeaveSpaceModal' && (
              <LeaveSpaceModal
                shoudlBeOpen={true}
                activeModal={props.activeModal}
                space={props.space}
              />
            )}
            <StyledFirstRow>
              <ScreenHeading
                heading={space.spaceName}
                info={`Read all the threads from ${space.spaceName}`}
                topic={space.spaceTopic}
              />
              <StyledButtonsContainer>
                <StyledDropdown>
                  <Dropdown icon="ellipsis horizontal">
                    <Dropdown.Menu>
                      {localStorage.getItem('uuid') ===
                        space.spaceCreatedByUserId && (
                        <Dropdown.Item
                          text="Edit space"
                          onClick={e => {
                            setModal('EditSpaceModal');
                          }}
                        />
                      )}
                      {localStorage.getItem('uuid') ===
                        space.spaceCreatedByUserId && (
                        <Dropdown.Item
                          text="Delete space"
                          onClick={e => {
                            setModal('DeleteSpaceModal');
                          }}
                        />
                      )}
                      {localStorage.getItem('uuid') !==
                        space.spaceCreatedByUserId && (
                        <Dropdown.Item
                          text="Leave space"
                          onClick={e => {
                            setModal('LeaveSpaceModal');
                          }}
                        />
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </StyledDropdown>

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
              </StyledButtonsContainer>
            </StyledFirstRow>
            <ScreenSectionHeading heading="Recent" />

            {/*Loop trough all the threads that are associated with the orgId*/}
            {threads.length > 0 &&
              threads.map(t => {
                let dateInfo = new Date(t.threadCreatedAt);
                let date = `${dateInfo.getDate()}/${dateInfo.getMonth()}/${dateInfo.getFullYear()} at ${dateInfo.getHours()}:${(
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
                    whenUserHasSeen={t.whenUserHasSeen}
                    isFollowUpDecided={
                      t.arrayOfUserIdsWhoFollowUp &&
                      t.arrayOfUserIdsWhoFollowUp.includes(
                        localStorage.getItem('uuid')
                      )
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
                    onClick={() => {
                      props.history.push(
                        `/mainscreen/${props.match.params.id}/${props.match.params.spaceId}/${t.id}`
                      );
                    }}
                    currentSpace={space.spaceName}
                  />
                );
              })}
          </StyledMainScreen>
          <RightSidebar />
        </MidRightContainer>
      </StyledMain>
    );
  }
};

const StyledMain = styled.div`
  display: flex;
  width: 100vw;
`;

const StyledMainScreen = styled.div`
  background-color: #fff7f3;
  min-height: 100vh;
  padding: 10vh 5%;
  margin-left: 309px;
  width: 70%;
`;

const MidRightContainer = styled.div`
  display: flex;
  background-color: #fff7f3;
  width: 100vw;
`;

const StyledFirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 5vh;
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyleErrorMessage = styled.h1`
  font-weight: 600;
`;

const StyledErrorScreen = styled.div`
  margin: auto;
  height: 100vh;
  padding: 10vh 5%;
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledDropdown = styled.div`
  border: 1px solid #00bc98;
  border-radius: 50%;
  margin: 0;
  margin-right: 10px;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: white;
  i.ellipsis.horizontal.icon {
    margin: 0;
  }
  .ui.dropdown .menu > .item:hover {
    background: #00bc98;
    color: white;
  }
  .item {
    margin: 5px;
    border-radius: 5px;
  }
`;

export default SpaceThreads;
