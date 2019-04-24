import React, {Component} from 'react';
import firebase from '../firebase/firebase';

export default class RegisterForm extends Component {
    state = {
        firstName: '',
        lastName: ''
    }

    changeInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    addUser = e => {
        e.preventDefault();
        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        const userRef = db.collection("users").add({
            firstName: this.state.firstName,
            lastName: this.state.lastName
        });
        this.setState({
            firstName: '',
            lastName: ''
        })
    };

    render() {
        return (
            <div>
                <input type="text" name="firstName" value={this.state.firstName} />
                <input type="text" name="lastName" value={this.state.lastName} />
                <button type="submit" onClick={this.addUser}>Register</button>
            </div>
        )
    }
}