import React, { useState, useContext, useCallback, useEffect } from 'react';
import styled from 'styled-components';

//Import components
import BackToButton from './reusable-components/BackToButton';
import ScreenHeading from './reusable-components/ScreenHeading';
import ThreadInformationCard from './reusable-components/ThreadInformationCard';
import CommentCard from './reusable-components/CommentCardComponents/CommentCard';
import NewCommentCard from './reusable-components/CommentCardComponents/NewCommentCard';
import NavBar from './NavBar';
import RightSidebar from './RightSidebar';

// import Context API
import Context from './ContextProvider/Context';

// import Spinner
import Spinner from './semantic-components/Spinner';

//Main component
const ThreadsScreen = props => {
  const {
    getThreadWithId,
    updateDataWithDoc,
    getCommentsWithThread,
    loading,
    useMountEffect,
    mountEffectFunction
  } = useContext(Context);

  useMountEffect(mountEffectFunction);

  const updateThread = useCallback(() => {
    let data = {};
    data[`whenUserHasSeen.${localStorage.getItem('uuid')}`] = Date.now();
    let request = {
      collection: 'threads',
      docId: props.match.params.threadId,
      data: data
    };
    updateDataWithDoc(request);
  }, [props.match.params.threadId, updateDataWithDoc]);

  const [thread, setThread] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    updateThread();
    let getCommentsUnsubscribe = getCommentsWithThread(
      setComments,
      props.match.params.threadId
    );
    let getThreadUnsubscribe = getThreadWithId(
      setThread,
      props.match.params.threadId
    );
    return () => {
      getCommentsUnsubscribe();
      getThreadUnsubscribe();
    };
  }, [
    getCommentsWithThread,
    getThreadWithId,
    updateThread,
    props.match.params.threadId
  ]);

  return (
    <StyledMain aria-label="ThreadsScreen">
      <NavBar {...props} />
      {!loading ? (
        <MidRightContainer>
          <StyledThreadContent>
            <BackToButton onClick={props.history.goBack} />
            {thread && thread.threadName && (
              <StyledHeadingContainer>
                <ScreenHeading heading={thread.threadName} />
              </StyledHeadingContainer>
            )}
            {thread && thread.threadName && (
              <ThreadInformationCard
                img="http://lorempixel.com/480/480"
                createdBy={thread.threadCreatedByUserName}
                createdAt={thread.threadCreatedAt}
                spaceId={thread.spaceId}
                info={thread.threadTopic}
              />
            )}
            {comments.length > 0 &&
              comments.map(c => {
                return (
                  <CommentCard
                    key={c.id}
                    img="http://lorempixel.com/480/480"
                    commentId={c.id}
                    createdBy={c.commentCreatedByUserName}
                    createdByUserId={c.commentCreatedByUserId}
                    content={c.commentBody}
                    likes={c.arrayOfUserIdsWhoLiked.length}
                    arrayOfUsersWhoLiked={c.arrayOfUserIdsWhoLiked}
                    isCommentDecided={c.isCommentDecided}
                    isCommentUpdated={c.isCommentUpdated}
                    commentUpdatedAt={c.commentUpdatedAt}
                    gifUrl={c.gifUrl}
                  />
                );
              })}

            <NewCommentCard
              img="http://lorempixel.com/480/480"
              createdByUserId={localStorage.getItem('uuid')}
              thread={thread}
            />
          </StyledThreadContent>
          <RightSidebar />
        </MidRightContainer>
      ) : (
        <div>
          <Spinner />
        </div>
      )}
    </StyledMain>
  );
};

const StyledMain = styled.div`
  display: flex;
  width: 100vw;
`;

const MidRightContainer = styled.div`
  display: flex;
  background-color: #fff7f3;
  width: 100vw;
`;

const StyledThreadContent = styled.div`
  width: 70%;
  min-height: 100vh;
  padding: 10vh 5%;
  margin-left: 309px;
  background-color: #fff7f3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const StyledHeadingContainer = styled.div`
  margin: 40px 0 30px 0;
  line-height: 1.3;
`;

export default ThreadsScreen;
