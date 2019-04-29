import React from 'react';
import db from './db';

export class GetTest2 extends React.Component {
  state = {
    users: [],
  }

  componentDidMount() {
    db.collection('users').get()
      .then(collection => {
        // console.log("users collection:", collection)
        collection.forEach(doc => {
          console.log(doc.id, "has data", doc.data().firstName)
          const newName = doc.data().firstName
          this.setState({ users: [...this.state.users, newName] });
        })
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      })
  }

  render() {
    return (
      <div className="editContainer">
        <h1>GetTest2</h1>
        <div>
          {
            <div>
              {this.state.users.map(user => (
                <div> {user} </div>
              ))}
            </div>
          }
        </div>
      </div>
    );
  }
}


export default GetTest2;
