import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

import Spinner from './semantic-components/Spinner';

class Register extends Component {
  static propTypes = {
    auth: PropTypes.object,
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired
    })
  };

  state = {
    email: '',
    password: '',
    password2: '',
    username: ''
  };

  componentWillUpdate() {
    if (!isLoaded(this.props.auth)) {
      return <Spinner />;
    }
    if (isLoaded(this.props.auth) && !isEmpty(this.props.auth)) {
      this.props.history.push('/homescreen');
    }
  }

  // componentDidMount() {
  //   if (!isLoaded(this.props.auth)) {
  //     return <Spinner />;
  //   }
  //   if (!isEmpty(this.props.auth)) {
  //     return null;
  //
  // }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createAndLogInNewUser = ({ email, password, username }) => {
    this.props.firebase
      .createUser({ email, password }, { username, email })
      .then(() => {
        this.props.firebase.login({ email, password });
      })
      .catch(err => console.log(err));
  };

  render() {
    if (!isLoaded(this.props.auth)) {
      return <Spinner />;
    }
    if (!isEmpty(this.props.auth)) {
      return null;
    }
    return (
      <div>
        <h1>Register a new account!</h1>
        <Link to='/login'> Already have an account? </Link>
        <form>
          <div>Email</div>
          <input name='email' type='email' onChange={this.handleInputChange} />
          <div>Password</div>
          <input
            name='password'
            type='password'
            onChange={this.handleInputChange}
          />
          <div>Re-enter password</div>
          <input
            name='password2'
            type='password'
            onChange={this.handleInputChange}
          />
          <div>Username</div>
          <input
            name='username'
            type='text'
            onChange={this.handleInputChange}
          />
          <button
            onClick={e => {
              e.preventDefault();
              this.createAndLogInNewUser({
                email: this.state.email,
                password: this.state.password,
                username: this.state.username
              });
            }}
          >
            Register
          </button>
        </form>

        <button
          onClick={() =>
            this.props.firebase.login({ provider: 'google', type: 'popup' })
          }
        >
          Sign in with Google
        </button>
      </div>
    );
  }
  // return (
  //   <div>
  //     <Redirect to='/homescreen' />
  //   </div>
  // )
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearFirestore: () => dispatch({ type: '@@reduxFirestore/CLEAR_DATA' })
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firebaseConnect()
)(Register);
