import React, { Component } from 'react';
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
        db.collection("users").add({
            firstName: this.state.firstName,
            lastName: this.state.lastName
        })
            .then(docRef => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(error => {
                console.log("Error adding document", error);
            })
        this.setState({
            firstName: '',
            lastName: ''
        })
    };

    render() {
        return (
            <div>
                <input type="text" name="firstName" value={this.state.firstName} onChange={this.changeInput} />
                <input type="text" name="lastName" value={this.state.lastName} onChange={this.changeInput} />
                <button type="submit" onClick={this.addUser}>Register</button>
            </div>
        )
    }
}