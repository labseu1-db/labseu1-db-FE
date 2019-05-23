import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Dropdown } from 'semantic-ui-react';

//Import icons
import penIconWhite from '../images/icon-pen-white.svg';

//Import actions
import { showModal, setActiveThread } from '../redux/actions/actionCreators';

//Import components
import ScreenHeading from './reusable-components/ScreenHeading';
import ScreenSectionHeading from './reusable-components/ScreenSectionHeading';
import ScreenButton from './reusable-components/ScreenButton';
import ThreadCard from './reusable-components/ThreadCard';

//Import Modals
import CreateThreadModal from './Modals/CreateThreadModal';
import EditSpaceModal from './Modals/EditSpaceModal';
import DeleteSpaceModal from './Modals/DeleteSpaceModal';
import LeaveSpaceModal from './Modals/LeaveSpaceModal';

function SpaceThreads(props) {
  return (
    <StyledMainScreen>
      {props.activeModal === 'CreateThreadModal' && (
        <CreateThreadModal
          shoudlBeOpen={true}
          showModal={props.showModal}
          activeModal={props.activeModal}
          setActiveThread={props.setActiveThread}
        />
      )}
      {props.activeModal === 'EditSpaceModal' && (
        <EditSpaceModal shoudlBeOpen={true} activeModal={props.activeModal} space={props.space} />
      )}
      {props.activeModal === 'DeleteSpaceModal' && (
        <DeleteSpaceModal shoudlBeOpen={true} activeModal={props.activeModal} space={props.space} />
      )}
      {props.activeModal === 'LeaveSpaceModal' && (
        <LeaveSpaceModal shoudlBeOpen={true} activeModal={props.activeModal} space={props.space} />
      )}
      <StyledFirstRow>
        <ScreenHeading heading={props.space.spaceName} info={`Read all the threads from ${props.space.spaceName}`} />
        <StyledButtonsContainer>
          <StyledDropdown>
            <Dropdown icon="ellipsis horizontal">
              <Dropdown.Menu>
                {localStorage.getItem('uuid') === props.space.spaceCreatedByUserId && (
                  <Dropdown.Item
                    text="Edit space"
                    onClick={e => {
                      props.showModal('EditSpaceModal');
                    }}
                  />
                )}
                {localStorage.getItem('uuid') === props.space.spaceCreatedByUserId && (
                  <Dropdown.Item
                    text="Delete space"
                    onClick={e => {
                      props.showModal('DeleteSpaceModal');
                    }}
                  />
                )}
                {localStorage.getItem('uuid') !== props.space.spaceCreatedByUserId && (
                  <Dropdown.Item
                    text="Leave space"
                    onClick={e => {
                      props.showModal('LeaveSpaceModal');
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
              props.showModal('CreateThreadModal');
            }}
          />
        </StyledButtonsContainer>
      </StyledFirstRow>
      <ScreenSectionHeading heading="Recent" />

      {/*Loop trough all the threads that are associated with the orgId*/}
      {props.threads.length > 0 &&
        props.threads.map(t => {
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
                t.arrayOfUserIdsWhoFollowUp && t.arrayOfUserIdsWhoFollowUp.includes(localStorage.getItem('uuid'))
                  ? true
                  : false
              }
              checked={
                (!t.whenUserHasSeen[localStorage.getItem('uuid')] && 'false') ||
                (t.lastCommentCreatedAt > t.whenUserHasSeen[localStorage.getItem('uuid')] ? 'false' : 'true')
              }
              onClick={() => {
                props.setActiveThread(t.id);
              }}
              currentSpace={props.space.spaceName}
            />
          );
        })}
    </StyledMainScreen>
  );
}

const StyledMainScreen = styled.div`
  background-color: #fff7f3;
  min-height: 100vh;
  padding: 10vh 5%;
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

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    threads: state.firestore.ordered.threads ? state.firestore.ordered.threads : [],
    space: state.firestore.ordered.spaces ? state.firestore.ordered.spaces[0] : [],
    spaceId: state.spaceId,
    activeModal: state.modal.activeModal,
    uuid: localStorage.getItem('uuid') ? localStorage.getItem('uuid') : ''
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
