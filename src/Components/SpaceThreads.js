import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

//Import icons
import penIconWhite from '../images/icon-pen-white.svg';

//Import actions
import { showModal, setActiveThread } from '../redux/actions/actionCreators';

//Import components
import ScreenHeading from './reusable-components/ScreenHeading';
import ScreenSectionHeading from './reusable-components/ScreenSectionHeading';
import ScreenButton from './reusable-components/ScreenButton';
import ThreadCard from './reusable-components/ThreadCard';
import CreateThreadModal from './Modals/CreateThreadModal';

function SpaceThreads(props) {
  return (
    <StyledMainScreen>
      {props.activeModal === 'CreateThreadModal' && (
        <CreateThreadModal shoudlBeOpen={true} showModal={props.showModal} activeModal={props.activeModal} />
      )}
      <StyledFirstRow>
        <ScreenHeading heading={props.space.spaceName} info={`Read all the threads from ${props.space.spaceName}`} />
        <ScreenButton
          content="Start a thread"
          icon={penIconWhite}
          backgroundColor="#5C4DF2"
          color="white"
          border="none"
          onClick={e => {
            props.showModal('CreateThreadModal');
          }}
        />
      </StyledFirstRow>
      <ScreenSectionHeading heading="Recent" />
      {props.threads.length > 0 &&
        props.threads.map(t => {
          let dateInfo = new Date(t.threadCreatedAt.seconds * 1000);
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
              checked="true"
              onClick={() => {
                props.setActiveThread(t.id);
                console.log(t.id);
              }}
            />
          );
        })}
    </StyledMainScreen>
  );
}

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

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    threads: state.firestore.ordered.threads ? state.firestore.ordered.threads : [],
    space: state.firestore.ordered.spaces ? state.firestore.ordered.spaces[0] : [],
    spaceId: state.spaceId,
    activeModal: state.modal.activeModal
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ showModal, setActiveThread }, dispatch);
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    return [
      {
        collection: 'threads',
        where: ['spaceId', '==', props.spaceId]
      },
      {
        collection: 'spaces',
        doc: props.spaceId
      }
    ];
  })
)(SpaceThreads);
