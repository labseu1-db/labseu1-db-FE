import React, {Component} from 'react';

export default class RegisterForm extends Component {
    state = {
        firstName: '',
        lastName: ''
    }

    changeInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div>
                <input type="text" name="firstName" value={this.state.firstName} />
                <input type="text" name="lastName" value={this.state.lastName} />
                <button type="submit">Register</button>
            </div>
        )
    }
}