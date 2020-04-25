import React, { useState, useContext, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';

//Import components
import BackToButton from './reusable-components/BackToButton';
import ScreenHeading from './reusable-components/ScreenHeading';
import ThreadInformationCard from './reusable-components/ThreadInformationCard';
import CommentCard from './reusable-components/CommentCardComponents/CommentCard';
import NewCommentCard from './reusable-components/CommentCardComponents/NewCommentCard';
import NavBar from './NavBar';
import RightSidebar from './RightSidebar';

//Import actions
import { resetThread } from '../redux/actions/actionCreators';

// import Context API
import Context from './ContextProvider/Context';

//Main component
const ThreadsScreen = props => {
  // componentDidMount() {
  //   let threadRef = props.firestore
  //     .collection('threads')
  //     .doc(props.match.params.threadId);
  //   let whenUserHasSeen = {};
  //   whenUserHasSeen[
  //     `whenUserHasSeen.${localStorage.getItem('uuid')}`
  //   ] = Date.now();
  //   threadRef.update(whenUserHasSeen);
  // }

  // componentWillUnmount() {
  //   let threadRef = props.firestore
  //     .collection('threads')
  //     .doc(props.match.params.threadId);
  //   let whenUserHasSeen = {};
  //   whenUserHasSeen[
  //     `whenUserHasSeen.${localStorage.getItem('uuid')}`
  //   ] = Date.now();
  //   threadRef.update(whenUserHasSeen);
  // }

  const { getThreadWithId, getCommentWithThread } = useContext(Context);

  const [thread, setThread] = useState('');
  const [comments, setComments] = useState([]);

  const setData = useCallback(async () => {
    let thread = await getThreadWithId(props.match.params.threadId);
    let comments = await getCommentWithThread(props.match.params.threadId);
    setComments(comments);
    setThread(thread);
  }, [getThreadWithId, getCommentWithThread, props.match.params.threadId]);

  useEffect(() => {
    setData();
  }, [setData]);

  return (
    <StyledMain>
      <NavBar {...props} />
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

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    activeThread: state.firestore.ordered.threads
      ? state.firestore.ordered.threads[0]
      : [],
    comments: state.firestore.ordered.comments
      ? state.firestore.ordered.comments
      : []
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ resetThread }, dispatch);
};

export default compose(
  withFirestore,
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    return [
      {
        collection: 'threads',
        doc: props.match.params.threadId
      },
      {
        collection: 'comments',
        where: [['threadId', '==', props.match.params.threadId]],
        orderBy: ['commentCreatedAt', 'asc']
      }
    ];
  })
)(ThreadsScreen);
