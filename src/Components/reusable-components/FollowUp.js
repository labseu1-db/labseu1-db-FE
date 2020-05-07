import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

//Import components
import ScreenHeading from './ScreenHeading';
import ThreadCard from './ThreadCard';
import NavBar from '../NavBar';

// import Context API
import Context from '../ContextProvider/Context';

//Main component
const FollowUp = props => {
  // use Context API
  const { getFollowUpThreads, redirect } = useContext(Context);

  // hooks to set threads
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    getFollowUpThreads(setThreads);
  }, [getFollowUpThreads]);

  return (
    <StyledMain>
      <NavBar {...props} />
      <StyledFollowUp>
        <StyledFirstRow>
          <ScreenHeading
            heading="Follow Up"
            info="Get back to the things you&#39;ve marked as follow up."
          />
        </StyledFirstRow>
        {threads.length > 0 &&
          threads.map(t => {
            let dateInfo = new Date(t.threadCreatedAt);
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
                checked={
                  (!t.whenUserHasSeen[localStorage.getItem('uuid')] &&
                    'false') ||
                  (t.lastCommentCreatedAt >
                  t.whenUserHasSeen[localStorage.getItem('uuid')]
                    ? 'false'
                    : 'true')
                }
                onClick={() => {
                  redirect(
                    `/mainscreen/${props.match.params.id}/${t.spaceId}/${t.id}`
                  );
                }}
                isFollowUpDecided="true"
              />
            );
          })}
      </StyledFollowUp>
    </StyledMain>
  );
};

export default FollowUp;

//Styling
const StyledMain = styled.div`
  display: flex;
  width: 100vw;
  background-color: #fff7f3;
`;

const StyledFollowUp = styled.div`
  background-color: #fff7f3;
  min-height: 100vh;
  padding: 10vh 5%;
  width: 60%;
  margin-left: 309px;
`;

const StyledFirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 5vh;
`;
