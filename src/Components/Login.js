import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import { StyledButton } from './styled-components/StyledButton';
import { StyledLogin, StyledForm, StyledInput, StyledLabel } from './styled-components/StyledLogin';
import { StyledH1, StyledLink, StyledPLabel } from './styled-components/StyledText';
import Spinner from './semantic-components/Spinner';
import GoogleButton from './semantic-components/GoogleButton';

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
		loginPassword: ''
	};

	componentWillUpdate() {
		if (!isEmpty(this.props.auth)) {
			this.props.history.push('/homescreen');
		}
	}

	handleInputChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
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
				<StyledH1>Log in!</StyledH1>
				<StyledForm>
					<StyledLabel>
						<StyledPLabel>Email Adress</StyledPLabel>
						<StyledInput name='loginEmail' type='email' onChange={this.handleInputChange} />
					</StyledLabel>
					<StyledLabel>
						<StyledPLabel>Password</StyledPLabel>
						<StyledInput name='loginPassword' type='password' onChange={this.handleInputChange} />
					</StyledLabel>
					<StyledButton
						onClick={(e) => {
							e.preventDefault();
							this.props.firebase.login({
								email: this.state.loginEmail,
								password: this.state.loginPassword
							});
						}}
					>
						Login
					</StyledButton>
				</StyledForm>
				<GoogleButton onClick={() => this.props.firebase.login({ provider: 'google', type: 'popup' })} />
				<StyledLink to='/register'> Don't have an account? </StyledLink>
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
