import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';



class ForgotPassword extends React.Component {
    static propTypes = {
        firestore: PropTypes.shape({
            add: PropTypes.func.isRequired
        }).isRequired
    };

    state = {
        emailAddress: "",
    }

    changeInput = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    submitHandler = (email, event) => {
        event.preventDefault();
        this.props.firebase.resetPassword(email).then(
            () => console.log('it worked')
        ).catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                <input type='email' name='emailAddress' onChange={this.changeInput} />
                <button type='submit' onClick={(event) => this.submitHandler(this.state.emailAddress, event)}>Submit</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
  return {};
};

//As we are not dispatching anything - this is empty
const mapDispatchToProps = {};

//Connect to Firestore
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect()
)(ForgotPassword);
