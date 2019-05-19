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
import CreateThreadModal from './Modals/CreateThreadModal';
import EditSpaceModal from './Modals/EditSpaceModal';

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
      <StyledFirstRow>
        <ScreenHeading heading={props.space.spaceName} info={`Read all the threads from ${props.space.spaceName}`} />
        <StyledButtonsContainer>
          <StyledDropdown>
            <Dropdown icon="ellipsis horizontal">
              <Dropdown.Menu>
                <Dropdown.Item
                  text="Edit space"
                  onClick={e => {
                    props.showModal('EditSpaceModal');
                  }}
                />
                <Dropdown.Item text="Leave space" />
              </Dropdown.Menu>
            </Dropdown>
          </StyledDropdown>

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
        </StyledButtonsContainer>
      </StyledFirstRow>
      <ScreenSectionHeading heading="Recent" />

      {/* If not threads, show placeholder - IT RENDERS PLACEHOLDER FOR A SECOND WHEN RENDERING THREADS
      {/*WE NEED TO FIGURE OUT THE LOGIC, BUT FOR NOW IT IS GOING TO BE COMMENTED OUT*/}
      {/* {props.threads.length === 0 && (
        <Placeholder
          heading='Learn about Home'
          info='Home is a great place where you find all information about active threads and current discussion. Be allways on the top of the things!'
          image={placeholder}
        />
      )} */}

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

const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledDropdown = styled.div`
  border: 1px solid #bdc3c9;
  border-radius: 50%;
  margin: 0;
  margin-right: 10px;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  i.ellipsis.horizontal.icon {
    margin: 0;
  }
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
