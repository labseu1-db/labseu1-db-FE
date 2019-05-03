import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import { Form } from 'semantic-ui-react';
import { StyledFormDiv, StyledForgotPasswordPage, StyledParagraph, StyledInput, InputDiv, StyledLabel } from './StyledComponents/ForgotPasswordStyled';



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
            () => {
                console.log('it worked')
            }
        ).catch(error => {
            console.log(error);
        })
    }


    render() {
        return (
            <StyledForgotPasswordPage>
                <h1>Forgot Password</h1>
                <StyledFormDiv>
                    <StyledParagraph>{"Please enter your email address and\nwe'll send you an email to reset your password"}</StyledParagraph>
                    <InputDiv>
                        <StyledLabel>Email Address</StyledLabel>
                        <StyledInput type='email' name='emailAddress' placeholder="you@example.com" onChange={this.changeInput} />
                    </InputDiv>
                    <button type='submit' onClick={(event) => this.submitHandler(this.state.emailAddress, event)}>Send Link</button>
                </StyledFormDiv>
                <Link to='/login'>Back to Sign In</Link>
            </StyledForgotPasswordPage>
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