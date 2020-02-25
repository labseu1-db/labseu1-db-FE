import React from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import styled from 'styled-components';

//Import components
import ScreenHeading from './ScreenHeading';
import ThreadCard from './ThreadCard';
import NavBar from '../NavBar';

//Import action creators
import {
  setActiveThread,
  hideFollowUp
} from '../../redux/actions/actionCreators';

//Main component
export class FollowUp extends React.Component {
  render() {
    return (
      <StyledMain aria-label="Follow Up">
        <NavBar {...this.props} />
        <StyledFollowUp>
          <StyledFirstRow>
            <ScreenHeading
              heading="Follow Up"
              info="Get back to the things you&#39;ve marked as follow up."
            />
          </StyledFirstRow>
          {this.props.threads.length > 0 &&
            this.props.threads.map(t => {
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
                    this.props.history.push(
                      `/mainscreen/${this.props.match.params.id}/${t.spaceId}/${t.id}`
                    );
                  }}
                  isFollowUpDecided="true"
                />
              );
            })}
        </StyledFollowUp>
      </StyledMain>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    threads: state.firestore.ordered.threads
      ? state.firestore.ordered.threads
      : [],
    uuid: localStorage.getItem('uuid') ? localStorage.getItem('uuid') : ''
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setActiveThread, hideFollowUp }, dispatch);
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    return [
      {
        collection: 'threads',
        where: [
          ['isFollowUp', '==', true],
          ['arrayOfUserIdsWhoFollowUp', 'array-contains', props.uuid]
        ],
        orderBy: ['threadCreatedAt', 'desc']
      }
    ];
  })
)(FollowUp);

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
