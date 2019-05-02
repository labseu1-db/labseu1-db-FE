import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Button, Icon } from 'semantic-ui-react';

import { StyledButton } from './styled-components/StyledButton';
import { StyledLogin, StyledForm, StyledInput, StyledLabel, StyledLoginCon } from './styled-components/StyledLogin';
import { StyledH1, StyledLink, StyledPLabel } from './styled-components/StyledText';
import Spinner from './semantic-components/Spinner';
import GoogleButton from './semantic-components/GoogleButton';
import LoginAnimation from './animations/LoginAnimation';

class Login extends Component {
	static propTypes = {
		auth: PropTypes.object,
		firebase: PropTypes.shape({
			login: PropTypes.func.isRequired,
			logout: PropTypes.func.isRequired
		})
	};

	state = {
		loginEmail: '',
		loginPassword: '',
		error: null
	};

	componentWillUpdate() {
		if (!isEmpty(this.props.auth)) {
			this.props.history.push('/homescreen');
		}
	}

	handleInputChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	togglePassword = () => {
		let temp = document.getElementById('typepass');
		if (temp.type === 'password') {
			temp.type = 'text';
		} else {
			temp.type = 'password';
		}
	};

	passwordlessSignIn = (loginEmail) => {
		const actionCodeSettings = {
			url: 'http://localhost:3000/passwordlesscheck',
			handleCodeInApp: true
		};

		const INITIAL_STATE = {
			loginEmail: '',
			loginPassword: '',
			error: null
		};

		this.props.firebase
			.auth()
			.sendSignInLinkToEmail(loginEmail, actionCodeSettings)
			.then(function() {
				window.localStorage.setItem('emailForSignIn', loginEmail);
			})
			.then(() => {
				this.setState({ ...INITIAL_STATE });
			})
			.catch((error) => {
				this.setState({ error: error.message }); // not working
			});
	};

	render() {
		const { loginEmail, loginPassword, error } = this.state;
		const isInvalid = loginPassword === '' || loginEmail === '';
		const passwordlessIsInvalid = loginEmail === '';

		if (!isLoaded(this.props.auth)) {
			return <Spinner />;
		}
		if (!isEmpty(this.props.auth)) {
			return null;
		}
		return (
			<StyledLogin>
				<StyledLoginCon>
					<StyledH1>Sign in</StyledH1>
					<StyledForm>
						<StyledLabel>
							<StyledPLabel>Email Address</StyledPLabel>
							<StyledInput name='loginEmail' type='email' onChange={this.handleInputChange} />
						</StyledLabel>
						<StyledLabel>
							<StyledPLabel>Password</StyledPLabel>
							<StyledInput
								id='typepass'
								name='loginPassword'
								type='password'
								onChange={this.handleInputChange}
							/>
						</StyledLabel>
						<StyledButton
							disabled={isInvalid}
							onClick={(e) => {
								const INITIAL_STATE = {
									loginEmail: '',
									loginPassword: '',
									error: null
								};
								e.preventDefault();
								this.props.firebase
									.login({
										email: this.state.loginEmail,
										password: this.state.loginPassword
									})
									.then(() => {
										this.setState({ ...INITIAL_STATE });
									})
									.catch((error) => {
										this.setState({ error });
									});
							}}
						>
							Login &#62;
						</StyledButton>
					</StyledForm>
					<Button
						color='google plus'
						onClick={() => this.props.firebase.login({ provider: 'google', type: 'popup' })}
					>
						<Icon name='google plus' /> Sign in with Google
					</Button>
					<StyledLink
						disabled={passwordlessIsInvalid}
						onClick={() => this.passwordlessSignIn(this.state.loginEmail)}
					>
						Email Me a Link to Sign In
					</StyledLink>
					<StyledLink to='/register'> Don't have an account? </StyledLink>
				</StyledLoginCon>
				<LoginAnimation />
			</StyledLogin>
		);
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

export default compose(connect(mapStateToProps, mapDispatchToProps), firebaseConnect())(Login);
