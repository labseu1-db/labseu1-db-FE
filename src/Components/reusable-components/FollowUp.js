import React from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import {
    firestoreConnect
} from 'react-redux-firebase';
import styled from 'styled-components';

//Import components
import ScreenHeading from './reusable-components/ScreenHeading';
import ThreadCard from './reusable-components/ThreadCard';

import { setActiveThread, hideFollowUp } from '../redux/actions/actionCreators';

//Main component
class FollowUp extends React.Component {
    render() {
        return (
            <StyledFollowUp>
                <StyledFirstRow>
                    <ScreenHeading
                        heading="Follow Up"
                        info="Get back to the things you've marked as follow up."
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
                                checked="true"
                                isFollowUpDecided="true"
                                onClick={() => {
                                    this.props.setActiveThread(t.id);
                                    this.props.hideFollowUp();
                                }}
                            />
                        );
                    })}
            </StyledFollowUp>
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
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    firestoreConnect(props => {
        return [
            {
                collection: 'threads',
                where: [
                    ['isFollowUp', '==', true],
                    ['arrayOfUserIdsWhoFollowUp', 'array-contains', props.uuid]
                ]
            }
        ];
    })
)(FollowUp);

//Styling
const StyledFollowUp = styled.div`
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
