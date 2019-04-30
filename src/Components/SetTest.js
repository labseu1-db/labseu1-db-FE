import React from 'react';
import db from './db';

export class SetTest extends React.Component {
  state = {
    someState: "",
  }

  onAddUser = () => {

    const newUser = "Bigger Sam"

    db.collection("users").add({
      firstName: newUser,
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }


  render() {
    return (
      <div className="editContainer">
        <div>
          <button onClick={this.onAddUser}>Add User</button>
        </div>
      </div>
    );
  }
}


export default SetTest;
