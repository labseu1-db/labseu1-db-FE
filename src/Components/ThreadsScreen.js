import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

//Import components
import BackToButton from './reusable-components/BackToButton';
import ScreenHeading from './reusable-components/ScreenHeading';
import ThreadInformationCard from './reusable-components/ThreadInformationCard';
import CommentCard from './reusable-components/CommentCard';
import NewCommentCard from './reusable-components/NewCommentCard';

//Main component
export class ThreadsScreen extends React.Component {
  render() {
    return (
      <StyledEnvironmentContainer>
        <StyledThreadScreen>
          <StyledThreadContent>
            <BackToButton onClick={() => this.props.history.push('/homescreen')} />
            {this.props.activeThread.threadName && (
              <StyledHeadingContainer>
                <ScreenHeading heading={this.props.activeThread.threadName} />
              </StyledHeadingContainer>
            )}
            {this.props.activeThread.threadName && (
              <ThreadInformationCard
                img="http://lorempixel.com/480/480"
                createdBy={this.props.activeThread.threadCreatedByUserName}
                createdAt={this.props.activeThread.threadCreatedAt}
                spaceId={this.props.activeThread.spaceId}
                info={this.props.activeThread.threadTopic}
              />
            )}
            {this.props.comments.length > 0 &&
              this.props.comments.map(c => {
                return (
                  <CommentCard
                    key={c.id}
                    img="http://lorempixel.com/480/480"
                    commentId={c.id}
                    createdBy={c.commentCreatedByUserName}
                    content={c.commentBody}
                    likes={c.arrayOfUserIdsWhoLiked.length}
                    arrayOfUsersWhoLiked={c.arrayOfUserIdsWhoLiked}
                    isCommentDecided={c.isCommentDecided}
                  />
                );
              })}

            <NewCommentCard img="http://lorempixel.com/480/480" createdByUserId={localStorage.getItem('uuid')} />
          </StyledThreadContent>
        </StyledThreadScreen>
      </StyledEnvironmentContainer>
    );
  }
}

//Styling
const StyledEnvironmentContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 0;
`;

const StyledThreadScreen = styled.div`
  width: 70%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #faf9f7;
  padding: 30px 10px 10px 0;
  padding: 10vh 5%;
`;

const StyledThreadContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
`;

const StyledHeadingContainer = styled.div`
  margin: 40px 0 30px 0;
`;

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    activeThread: state.firestore.ordered.threads ? state.firestore.ordered.threads[0] : [],
    comments: state.firestore.ordered.comments ? state.firestore.ordered.comments : []
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
        doc: props.match.params.id
      },
      {
        collection: 'comments',
        where: [['threadId', '==', props.match.params.id]],
        orderBy: ['commentCreatedAt', 'desc']
      }
    ];
  })
)(ThreadsScreen);
