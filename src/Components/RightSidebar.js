import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

export default function RightSidebar() {
	return (
		<StyledContainer>
			<div>RightSidebar</div>
			<GetStarted>
				<GetStartedTop className='top'>
					<p>Let's Get Started!</p>
				</GetStartedTop>
				<GetStartedCheckboxes>
					<GetStartedCheck className='checkbox'>
						<Icon name='check square outline' />
						<p>Create an organization</p>
					</GetStartedCheck>
					<GetStartedCheck className='checkbox'>
						<Icon name='check square outline' />
						<p>Connect Slack</p>
					</GetStartedCheck>
					<GetStartedCheck className='checkbox'>
						<Icon name='check square outline' />
						<p>Invite Team Members</p>
					</GetStartedCheck>
				</GetStartedCheckboxes>
			</GetStarted>

			<LearnMore>
				<p>Learn about Threads</p>
				<LearnTopic>
					<Icon name='check square outline' />
					<p>What is a Thread?</p>
				</LearnTopic>
				<LearnTopic>
					<Icon name='check square outline' />
					<p>What are spaces and how do I use them?</p>
				</LearnTopic>
				<LearnTopic>
					<Icon name='check square outline' />
					<p>What threads should I write?</p>
				</LearnTopic>
			</LearnMore>
		</StyledContainer>
	);
}

const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: #faf9f7;
	color: #3d4856;
	font-weight: 700;
	width: 100%;
	height: 100%;
	padding: 1%;
`;
const GetStarted = styled.div`
	border: 1px solid lightgray;
	border-radius: 15px;
`;
const GetStartedTop = styled.div`
	background-color: #6c48f2;
	border-radius: 15px 15px 0 0;
	padding: 30px;
	color: white;
	text-align: end;
	font-weight: 700;
`;
const GetStartedCheckboxes = styled.div`padding: 10px;`;
const GetStartedCheck = styled.div`
	background-color: white;
	border-radius: 0 0 15px 15px;
	display: flex;
	padding: 5px;
`;
const LearnMore = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;
const LearnTopic = styled.div`
	border: 1px solid lightgray;
	border-radius: 5px;
	background-color: white;
	display: flex;
	padding: 15px;
	margin-top: 5px;
`;
