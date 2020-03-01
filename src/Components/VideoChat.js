import React, { Component } from 'react';
import NavBar from './NavBar';
import RightSidebar from './RightSidebar';
import styled from 'styled-components';
import axios from 'axios';
import * as redux from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { Header, Modal, Dropdown } from 'semantic-ui-react';
import uuid from 'uuid';
import Spinner from './semantic-components/Spinner.js';

import ScreenHeading from './reusable-components/ScreenHeading';
import UserSideBar from './UserSideBar';

class VideoChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idsInCall: [],
      roomName: ''
    };
  }
  setIdsToState = (e, data) => {
    e.preventDefault();
    const { value } = data;

    this.setState(prState => ({
      idsInCall: [...prState.idsInCall, ...value]
    }));
  };

  find_duplicate_in_array = arra1 => {
    var object = {};
    var result = [];

    arra1.forEach(function(item) {
      if (!object[item]) object[item] = 0;
      object[item] += 1;
    });

    for (var prop in object) {
      if (object[prop] >= 2) {
        result.push(prop);
      }
    }

    return result;
  };

  setRoomName = e => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ roomName: value });
  };
  createCall = e => {
    e.preventDefault();
    let roomId = uuid();
    let idsInCall = this.find_duplicate_in_array(this.state.idsInCall);
    this.props.firestore
      .set(
        { collection: 'rooms', doc: roomId },
        {
          creatorId: this.props.uuid,
          ended: false,
          userWhoHaventSeen: this.state.idsInCall,
          userWhoHaveSeen: [],
          roomName: this.state.roomName,
          spaceId: this.props.match.params.spaceId
        }
      )
      .then(() => {
        this.props.history.push(
          `/video/${this.props.match.params.id}/${this.props.match.params.spaceId}/${roomId}`
        );
      });
  };
  render() {
    const userIdsOptions = this.props.users
      .filter(user => user.id !== this.props.uuid)
      .map(user => ({
        key: user.id,
        text: user.fullName,
        value: user.id
      }));
    if (this.props.match.params.roomId === 'createCall') {
      return (
        <StyledMain>
          <NavBar {...this.props} />
          <StyledCreateVoiceChat>
            <ScreenHeading heading={'Create a Call'} />
            <StyledCreateCallContainer>
              <Header as='h5'>Room name</Header>
              <StyledInput
                name='spaceName'
                placeholder='Product Design'
                type='text'
                required
                value={this.state.roomName}
                onChange={this.setRoomName}
              />
              <Header as='h5'>Members</Header>
              <StyledDropdown>
                {
                  <Dropdown
                    placeholder='Choose people to add'
                    fluid
                    multiple
                    search
                    selection
                    options={userIdsOptions}
                    onChange={this.setIdsToState}
                    onClick={this.deleteFromState}
                  />
                }
              </StyledDropdown>
              <Modal.Actions>
                <StyledActions>
                  <StyledButtonCancel onClick={this.props.history.goBack}>
                    Cancel
                  </StyledButtonCancel>

                  <StyledButtonCreateSpace
                    type='submit'
                    disabled={!this.state.idsInCall.length > 0}
                    onClick={e => {
                      this.createCall(e);
                    }}
                  >
                    Create Call
                  </StyledButtonCreateSpace>
                </StyledActions>
              </Modal.Actions>
            </StyledCreateCallContainer>
          </StyledCreateVoiceChat>
          <RightSidebar />
        </StyledMain>
      );
    } else if (!isEmpty(this.props.currentRoom)) {
      const users = [
        ...this.props.currentRoom.userWhoHaventSeen,
        ...this.props.currentRoom.userWhoHaveSeen
      ];
      axios
        .post('http://localhost:4000/createToken', {
          user: 'Thorben',
          room: this.props.profile.fullName
        })
        .then(() => {
          startRecording();
          makeCall();
        });
      let startRecording = async () => {
        const constraints = { video: true, audio: false };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const mediaRef = document.getElementById('local-video');
        mediaRef.srcObject = stream;
      };
      let makeCall = async () => {
        const SignalingChannel = new SignalingChannel(
          this.props.currentRoom.id
        );
        SignalingChannel.addEventListener('message', message => {
          // New message from remote client received
        });
        const configuration = {
          iceServers: [{ urls: `stun:stun.l.google.com:${this.prop.roomId}` }]
        };
        const peerConnection = new RTCPeerConnection(configuration);
        SignalingChannel.addEventListener('message', async message => {
          if (message.answer) {
            const remoteDesc = new RTCSessionDescription(message.answer);
            await peerConnection.setRemoteDescription(remoteDesc);
          }
        });
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        SignalingChannel.send({ offer: offer });
      };
      // .then(res => {
      //   connect(res.data.jwt, { name: this.props.currentRoom.roomName }).then(
      //     room => {
      //       startRecording();
      //       room.on('participantConnected', participant => {
      //         console.log('participant connected', participant);
      //         participant.tracks.forEach(publication => {
      //           if (publication.isSubscribed) {
      //             const track = publication.track;
      //             document
      //               .getElementById('remote-media-div')
      //               .appendChild(track.attach());
      //           }
      //         });
      //       });
      //     }
      //   );
      // });
      return (
        <StyledMain>
          <NavBar {...this.props} />
          <StyledVoiceCall>
            <video autoPlay inline='true' id='local-video'></video>
          </StyledVoiceCall>

          {users.map(user => (
            <UserSideBar key={user} userForSideBar={user} {...this.props} />
          ))}
        </StyledMain>
      );
    } else {
      return <Spinner />;
    }
  }
}
const mapStateToProps = state => {
  return {
    profile: state.firebase.profile,
    users: state.firestore.ordered.usersWithinTheOrg
      ? state.firestore.ordered.usersWithinTheOrg
      : [],
    uuid: localStorage.getItem('uuid') ? localStorage.getItem('uuid') : '',
    currentRoom: state.firestore.ordered.createdRoom
      ? state.firestore.ordered.createdRoom[0]
      : []
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      clearFirestore: () => dispatch({ type: '@@reduxFirestore/CLEAR_DATA' })
    },
    dispatch
  );
};

//Connect to Firestore
export default compose(
  redux.connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    return [
      {
        collection: 'users',
        where: ['arrayOfOrgsIds', 'array-contains', props.match.params.id],
        storeAs: 'usersWithinTheOrg'
      },
      {
        collection: 'rooms',
        doc: props.match.params.roomId,
        storeAs: 'createdRoom'
      }
    ];
  })
)(VideoChat);

const StyledMain = styled.div`
  display: flex;
  width: 100vw;
`;

const StyledVoiceCall = styled.div`
  width: 70%;
  min-height: 100vh;
  padding: 10vh 5%;
  margin-left: 309px;
  background-color: #fff7f3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const StyledCreateVoiceChat = styled.div`
  width: 70%;
  min-height: 100vh;
  padding: 10vh 5%;
  margin-left: 309px;
  background-color: #fff7f3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const StyledCreateCallContainer = styled.div`
  padding: 40px;
  border-radius: 6px;
  position: relative;
  align-self: center;
  width: 100%;
`;

const StyledButtonCancel = styled.button`
  cursor: pointer;
  padding: 5px 25px;
  color: #00bc98;
  border-radius: 15px;
  background-color: white;
  border: 1px solid #00bc98;
  margin-right: 10px;
`;
const StyledButtonCreateSpace = styled.button`
  cursor: pointer;
  padding: 5px 25px;
  color: white;
  border: 1px solid #00bc98;
  border-radius: 15px;
  outline: none;
  background-color: #00bc98;
  &:disabled {
    background-color: #00bc9880;
    border: none;
  }
`;

const StyledDropdown = styled.div`
  .ui.dropdown .menu > .item:hover {
    background: #00bc98;
    color: white;
  }
  .item {
    margin: 5px;
    border-radius: 5px;
  }
  .ui.label {
    background: #00bc98;
    color: white;
    border: none;
  }
  .i.icon.delete {
    color: white;
  }
`;

const StyledActions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 30px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 32px;
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #374750;
  background-color: #fff7f3;
  border: none;
  border-bottom: 2px solid lightgray;
  padding: 5px 0;
  margin-bottom: 10px;
  &:focus {
    border-bottom: 2px solid #00bc98;
    outline: none;
  }
`;
