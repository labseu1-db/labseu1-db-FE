import React, { Component } from "react";
import { connect, createLocalVideoTrack } from "twilio-video";
import NavBar from "./NavBar";
import RightSidebar from "./RightSidebar";
import styled from "styled-components";
import axios from "axios";
import * as redux from "react-redux";
import { compose, bindActionCreators } from "redux";
import { firestoreConnect, withFirestore } from "react-redux-firebase";
import { Header, Modal, Dropdown } from "semantic-ui-react";

import ScreenHeading from "./reusable-components/ScreenHeading";

class VideoChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idsInCall: [this.props.uuid]
    };
  }
  setIdsToState = (e, data) => {
    e.preventDefault();
    const { value } = data;
    this.setState(prState => ({
      idsInCall: [...prState.idsInCall, ...value]
    }));
  };
  createCall = e => {
    e.preventDefault();
    let objectOfCallIds = {};
    this.state.idsInCall.forEach(id => {
      objectOfCallIds[id] = false;
    });
    this.props.firestore
      .update(
        { collection: "calls", doc: this.props.match.params.spaceId },
        {
          creatorId: this.props.uuid,
          ended: false,
          invitedUsersIds: objectOfCallIds
        }
      )
      .then(res => {
        console.log(res);
      });
  };
  startRecording = () => {
    createLocalVideoTrack({
      audio: true,
      video: { width: 1280, height: 720 }
    }).then(localTracks => {
      let video = document.getElementById("recording");
      video.appendChild(localTracks.attach());
    });
  };
  render() {
    console.log(this.props.match.params.spaceId);
    if (this.props.match.params.type === "createCall") {
      const userIdsOptions = this.props.users
        .filter(user => user.id !== this.props.uuid)
        .map(user => ({
          key: user.id,
          text: user.fullName,
          value: user.id
        }));
      console.log(userIdsOptions);
      return (
        <StyledMain>
          <NavBar {...this.props} />
          <StyledCreateVoiceChat>
            <ScreenHeading heading={"Create a Call"} />
            <StyledCreateCallContainer>
              <div>
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
              </div>
            </StyledCreateCallContainer>
          </StyledCreateVoiceChat>
          <RightSidebar />
        </StyledMain>
      );
    } else {
      axios
        .post("http://localhost:3000/createToken", {
          user: "Thorben",
          room: "test-space"
        })
        .then(res => {
          console.log(res.data);
        });
      return (
        <div>
          <p>this</p>
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    profile: state.firebase.profile,
    users: state.firestore.ordered.usersWithinTheOrg
      ? state.firestore.ordered.usersWithinTheOrg
      : [],
    uuid: localStorage.getItem("uuid") ? localStorage.getItem("uuid") : ""
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      clearFirestore: () => dispatch({ type: "@@reduxFirestore/CLEAR_DATA" })
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
        collection: "users",
        where: ["arrayOfOrgsIds", "array-contains", props.match.params.id],
        storeAs: "usersWithinTheOrg"
      }
    ];
  })
)(VideoChat);

const StyledMain = styled.div`
  display: flex;
  width: 100vw;
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
