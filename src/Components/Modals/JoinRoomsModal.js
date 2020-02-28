import { Modal, Button, Header, Icon } from 'semantic-ui-react';
import React from 'react';
import { Link } from 'react-router-dom';

const JoinRoomsModal = props => {
  console.log(props.rooms);
  const declineCall = id => {
    sawCall(id);
  };
  const acceptCall = id => {
    sawCall(id);
    props.history.push(
      `/video/${props.match.params.id}/${props.match.params.spaceId}/${id}`
    );
  };
  const sawCall = id => {
    const uuid = localStorage.getItem('uuid');
    props.firestore.update(
      { collection: 'rooms', doc: id },
      { userWhoHaveSeen: props.firestore.FieldValue.arrayUnion(uuid) }
    );
    props.firestore.update(
      { collection: 'rooms', doc: id },
      { userWhoHaventSeen: props.firestore.FieldValue.arrayRemove(uuid) }
    );
  };
  return (
    <div>
      {props.rooms.map(room => (
        <Modal open={true} basic size='small' key={room.id}>
          <Header icon='call' content='Incoming' />
          <Modal.Content>
            <h3>You got invited to the room: {room.roomName}</h3>
          </Modal.Content>
          <Modal.Actions inline='true'>
            <Button color='green' inverted onClick={() => acceptCall(room.id)}>
              <Icon name='checkmark' /> Join
            </Button>
            <Button color='red' inverted onClick={() => declineCall(room.id)}>
              <Icon name='close' /> Decline
            </Button>
          </Modal.Actions>
        </Modal>
      ))}
    </div>
  );
};

export default JoinRoomsModal;
