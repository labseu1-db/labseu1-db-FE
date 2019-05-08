import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import NavBar from './NavBar';
import styled from 'styled-components';

import Spinner from './semantic-components/Spinner';
import RightSidebar from './RightSidebar';
import MainScreen from './MainScreen';

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
			<StyledHomeScreen>
				<FirstDiv>
					<NavBar />
				</FirstDiv>
				<SecondDiv>
					<MainScreen />
				</SecondDiv>
				<ThirdDiv>
					<RightSidebar />
				</ThirdDiv>
			</StyledHomeScreen>
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

const StyledHomeScreen = styled.div`
	display: flex;
`
const FirstDiv = styled.div`
	width: 15vw;
	border: 1px solid black;
`

const SecondDiv = styled.div`
	width: 60vw;
	border: 1px solid black;
`

const ThirdDiv = styled.div`
	width: 25vw;
	border: 1px solid black;
`

export default compose(connect(mapStateToProps, mapDispatchToProps), firebaseConnect())(FakeHome);
