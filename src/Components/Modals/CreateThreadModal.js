import React, { Component } from 'react';
import { Icon, Modal } from 'semantic-ui-react';
import styled from 'styled-components';

import textCursor from '../../images/icon-cursor-purple.svg';

export default class CreateThreadModal extends Component {
	handleInputChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<Modal open={this.props.shoudlBeOpen} size='small'>
				<Modal.Content>
					<StyledTitleInput
						name='threadTitle'
						type='text'
						placeholder='Create a title'
						required
						onChange={this.handleInputChange}
					/>
					<StyledThreadInput
						name='threadTitle'
						type='text'
						placeholder='What would you like to discuss with your teammates?'
						required
						onChange={this.handleInputChange}
					/>
				</Modal.Content>

				<Modal.Actions>
					<StyledActions>
						<StyledIconButton>
							<img src={textCursor} alt='cursor' />
						</StyledIconButton>
						<div>
							<StyledButton>Back</StyledButton>
							<StyledButton>Post</StyledButton>
						</div>
					</StyledActions>
				</Modal.Actions>
			</Modal>
		);
	}
}
const StyledTitleInput = styled.input`
	border: none;
	outline: none;
	width: 100%;
	height: 56px;
	font-family: 'Open Sans', sans-serif;
	font-size: 36px;

	font-weight: 300;
	line-height: 1.11;
`;
const StyledThreadInput = styled.input`
	border: none;
	outline: none;
	width: 100%;
`;
const StyledActions = styled.div`
	display: flex;
	justify-content: space-between;
`;
const StyledButton = styled.button`
	padding: 5px 25px;
	color: white;
	border: 1px solid #5c4df2;
	border-radius: 15px;
	outline: none;
	background-color: #5c4df2;
	margin-right: 10px;
	&:disabled {
		background-color: lightgray;
	}
`;

const StyledIconButton = styled.button`
	color: #5c4df2;
	background-color: white;
	border: 1px solid #5c4df2;
	border-radius: 50%;
	outline: none;
	padding: 5px;
`;
