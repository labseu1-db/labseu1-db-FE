import React, { Component } from "react";
import { connect, createLocalVideoTrack } from "twilio-video";

class VideoChat extends Component {
  startVideo = () => {};
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
    connect(this.props.match.params.id, { name: "gaming-time" }).then(
      room => {
        console.log(`Successfully joined a Room: ${room}`);
        room.on("participantConnected", participant => {
          console.log(`Participant "${participant.identity}" connected`);

          participant.tracks.forEach(publication => {
            if (publication.isSubscribed) {
              const track = publication.track;
              document.getElementById("recording").appendChild(track.attach());
            }
          });

          participant.on("trackSubscribed", track => {
            document.getElementById("recording").appendChild(track.attach());
          });
        });
      },
      error => {
        console.error(`Unable to connect to Room: ${error.message}`);
      }
    );
    return (
      <div>
        <p onClick={this.startVideo}>Hello</p>
        <button onClick={this.startRecording}>Record</button>
        <div id="recording"></div>
      </div>
    );
  }
}

export default VideoChat;
