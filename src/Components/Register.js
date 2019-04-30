import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

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
		username: '',
		loginEmail: '',
		loginPassword: ''
	};

	handleInputChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	createNewUser = ({ email, password, username }) => {
		this.props.firebase.createUser({ email, password }, { username, email });
	};

	render() {
		if (!isLoaded(this.props.auth)) {
			return null;
		}
		if (isEmpty(this.props.auth)) {
			return (
				<div>
					<form>
						<input name="email" type="email" onChange={this.handleInputChange} />
						<input name="password" type="password" onChange={this.handleInputChange} />
						<input name="username" type="text" onChange={this.handleInputChange} />
						<button
							onClick={() =>
								this.createNewUser({
									email: this.state.email,
									password: this.state.password,
									username: this.state.username
								})}
						>
							Register
						</button>
					</form>

					<button onClick={() => this.props.firebase.login({ provider: 'google', type: 'popup' })}>
						Sign in with Google
					</button>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		clearFirestore: () => dispatch({ type: '@@reduxFirestore/CLEAR_DATA' })
	};
};

export default compose(connect(mapStateToProps, mapDispatchToProps), firebaseConnect())(Register);
