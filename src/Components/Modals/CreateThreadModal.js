import React, { Component } from 'react';
import { Icon, Modal } from 'semantic-ui-react';
import styled from 'styled-components';

export default class CreateThreadModal extends Component {
	handleInputChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<Modal open={this.props.shoudlBeOpen} size='small'>
				<Modal.Header>
					<input
						name='threadTitle'
						type='text'
						placeholder='Create a title'
						required
						onChange={this.handleInputChange}
					/>
				</Modal.Header>
				<Modal.Content>
					<Modal.Description>
						<input
							name='threadTitle'
							type='text'
							placeholder='What would you like to discuss with your teammates?'
							required
							onChange={this.handleInputChange}
						/>
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<StyledModalButton>
						<Icon name='text cursor' />
					</StyledModalButton>
					<StyledModalButton>Back</StyledModalButton>
					<StyledModalButton>Post</StyledModalButton>
				</Modal.Actions>
			</Modal>
		);
	}
}

const StyledModalButton = styled.button`
	padding: 5px 15px;
	color: white;
	border-radius: 15px;
	background-color: #5c4df2;
`;
