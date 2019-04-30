import React, { Component } from 'react';
import Register from './Components/Register';
import Login from './Components/Login';
import { Route } from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<div>
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
			</div>
		);
	}
}

export default App;
