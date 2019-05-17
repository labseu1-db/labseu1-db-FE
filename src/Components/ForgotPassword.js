import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';

import { StyledSendEmailButton } from './styled-components/StyledButton';
import {
  StyledLogin,
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledLoginCon,
  StyledLowerSignInPasswordless
} from './styled-components/StyledLogin';
import { StyledH1, StyledLink, StyledPLabel } from './styled-components/StyledText';
import LoginAnimation from './animations/LoginAnimation';
import { Icon, Message } from 'semantic-ui-react';

class ForgotPassword extends Component {
  static propTypes = {
    firestore: PropTypes.shape({
      add: PropTypes.func.isRequired
    }).isRequired
  };

  state = {
    loginEmail: '',
    error: null
  };

  INITIAL_STATE = {
    loginEmail: '',
    error: null
  };

  submitHandler = (email, event) => {
    event.preventDefault();
    this.props.firebase
      .resetPassword(email)
      .then(() => {
        this.props.history.push('/login');
      })
      .catch(error => {
        const INITIAL_STATE = {
          loginEmail: '',
          error: null
        };
        this.setState({ ...INITIAL_STATE, error });
      });
  };

  componentWillUpdate() {
    if (!isEmpty(this.props.auth)) {
      this.props.history.push('/homescreen');
    }
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { loginEmail } = this.state;
    const isInvalid = loginEmail === '';
    return (
      <StyledLogin>
        <StyledLoginCon>
          <StyledH1>Reset Password</StyledH1>
          <StyledForm
            onSubmit={event => {
              this.submitHandler(this.state.loginEmail, event);
            }}>
            <StyledLabel>
              <StyledPLabel>Email Address</StyledPLabel>
              <StyledInput
                name="loginEmail"
                value={this.state.loginEmail}
                type="email"
                onChange={this.handleInputChange}
                placeholder="tonystark@example.com"
              />
            </StyledLabel>
            <StyledLowerSignInPasswordless>
              <StyledSendEmailButton
                disabled={isInvalid}
                onClick={event => {
                  this.submitHandler(this.state.loginEmail, event);
                }}>
                Send Email &#62;
              </StyledSendEmailButton>
            </StyledLowerSignInPasswordless>
          </StyledForm>
          {this.state.error && (
            <Message warning attached="bottom">
              <Icon name="warning" />
              {this.state.error.message}
            </Message>
          )}
          <StyledLink to="/login">Back to Log In</StyledLink>
        </StyledLoginCon>
        <LoginAnimation />
      </StyledLogin>
    );
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
