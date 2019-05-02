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
import LoginAnimation from './animations/LoginAnimation';

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
		fullName: ''
	};

	componentWillUpdate() {
		if (!isLoaded(this.props.auth)) {
			return <Spinner />;
		}
		if (isLoaded(this.props.auth) && !isEmpty(this.props.auth)) {
			this.props.history.push('/homescreen');
		}
	}

	handleInputChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	createAndLogInNewUser = ({ email, password, fullName }) => {
		this.props.firebase
			.createUser({ email, password }, { fullName, email })
			.then(() => {
				this.props.firebase.login({ email, password });
			})
			.catch((err) => console.log(err));
	};

	render() {
		if (!isLoaded(this.props.auth)) {
			return <Spinner />;
		}
		if (!isEmpty(this.props.auth)) {
			return null;
		}
		return (
			<StyledLogin>
				<StyledLoginCon>
					<StyledH1>Register a new account!</StyledH1>
					<StyledForm>
						<StyledLabel>
							<StyledPLabel>Email</StyledPLabel>
							<StyledInput name='email' type='email' onChange={this.handleInputChange} />
						</StyledLabel>
						<StyledLabel>
							<StyledPLabel>Password</StyledPLabel>
							<StyledInput name='password' type='password' onChange={this.handleInputChange} />
						</StyledLabel>

						<StyledLabel>
							<StyledPLabel>Full Name</StyledPLabel>
							<StyledInput name='fullName' type='text' onChange={this.handleInputChange} />
						</StyledLabel>
						<StyledButton
							onClick={(e) => {
								e.preventDefault();
								this.createAndLogInNewUser({
									email: this.state.email,
									password: this.state.password,
									fullName: this.state.fullName
								});
							}}
						>
							Register &#62;
						</StyledButton>
					</StyledForm>

					<Button
						color='google plus'
						onClick={() => this.props.firebase.login({ provider: 'google', type: 'popup' })}
					>
						<Icon name='google plus' /> Sign in with Google
					</Button>
					<StyledLink to='/login'> Already have an account? </StyledLink>
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

export default compose(connect(mapStateToProps, mapDispatchToProps), firebaseConnect())(Register);
