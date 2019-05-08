import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';

import Spinner from './semantic-components/Spinner';

class FakeHome extends Component {
	componentWillUpdate() {
		if (isEmpty(this.props.auth)) {
			this.props.history.push('/login');
		}
	}

	render() {
		if (!isLoaded(this.props.auth)) {
			return <Spinner />;
		}
		return (
			<div>
				<h1>Welcome to the restricted fake homescreen! </h1>
				<button
					onClick={async (e) => {
						e.preventDefault();
						await this.props.firebase.logout();
						this.props.clearFirestore();
					}}
				>
					Logout
				</button>
			</div>
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

export default compose(connect(mapStateToProps, mapDispatchToProps), firebaseConnect())(FakeHome);
