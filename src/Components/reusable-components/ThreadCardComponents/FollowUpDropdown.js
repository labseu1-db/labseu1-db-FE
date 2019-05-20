import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';

//Semantic components
import { Dropdown } from 'semantic-ui-react';

//Main component
export class FollowUpDropdown extends React.Component {
    markAsFollowUp = e => {
        e.preventDefault();
        let threadRef = this.props.firestore
            .collection('threads')
            .doc(this.props.threadId);
        threadRef.update({
            isFollowUp: true,
            arrayOfUserIdsWhoFollowUp: this.props.firestore.FieldValue.arrayUnion(
                localStorage.getItem('uuid')
            )
        });
        console.log('this thread id has been updated:', this.props.threadId);
    };

    removeFollowUp = e => {
        e.preventDefault();
        let threadRef = this.props.firestore
            .collection('threads')
            .doc(this.props.threadId);
        threadRef.update({
            isFollowUp: false
        });
    };

    render() {
        return (
            <Dropdown>
                <Dropdown.Menu>
                    {!this.props.isFollowUpDecided && (
                        <Dropdown.Item
                            text="Mark for follow up"
                            onClick={e => this.markAsFollowUp(e)}
                        />
                    )}
                    {this.props.isFollowUpDecided && (
                        <Dropdown.Item
                            text="Remove follow up"
                            onClick={e => this.removeFollowUp(e)}
                        />
                    )}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    };
};

const mapDispatchToProps = {};

export default compose(
    withFirestore,
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    firestoreConnect()
)(FollowUpDropdown);
