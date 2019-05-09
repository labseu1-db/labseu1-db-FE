import React from 'react';
import styled from 'styled-components';
import { Modal, Image } from 'semantic-ui-react';
import checkMarkOff from '../images/checkMarkOff.svg';
import checkMarkOn from '../images/checkMarkOn.svg';
import plantImg from '../images/plant.png';
import discussionImg from '../images/discussion.svg';
import mobileImg from '../images/mobile.svg';
import voiceImg from '../images/voice.svg';

export default class RightSidebar extends React.Component {
	toggleCheck = () => {
		let check = document.getElementById('check');
		if (check.src === checkMarkOn) {
			check.src = checkMarkOn;
		} else {
			check.src = checkMarkOn;
		}
	};
	render() {
		return (
			<StyledContainer>
				<SearchSpace />
				<GetStarted>
					<GetStartedTop className='top'>
						<PlantImg src={plantImg} alt='plant' />
						<p>Let's Get Started!</p>
					</GetStartedTop>
					<GetStartedCheckboxes>
						<GetStartedCheck className='checkbox'>
							<CheckImg src={checkMarkOn} alt='checkMarkOn' />
							<Paragraph>Create an organization</Paragraph>
						</GetStartedCheck>
						<GetStartedCheck className='checkbox'>
							<CheckImg src={checkMarkOff} alt='checkMarkOff' />
							<Paragraph>Connect Slack</Paragraph>
						</GetStartedCheck>
						<GetStartedCheck className='checkbox'>
							<CheckImg src={checkMarkOn} alt='checkMarkOn' />
							<Paragraph>Invite Team Members</Paragraph>
						</GetStartedCheck>
					</GetStartedCheckboxes>
				</GetStarted>

				<LearnMore>
					<p>Learn about Threads</p>
					<LearnTopic onClick={this.toggleCheck}>
						<CheckImg src={checkMarkOff} alt='checkMarkOff' id='check' />
						<Modal size='tiny' trigger={<Paragraph>What is Threads?</Paragraph>}>
							<ModalImg>
								<Image src={discussionImg} size='medium' centered />
							</ModalImg>
							<Modal.Header>What is Threads?</Modal.Header>
							<Modal.Content>
								<Modal.Description>
									<p>
										Threads helps your team do their best work by enabling thoughtful, focused and
										inclusive discussions. With Threads, you can easily inform, discuss, and make
										decisions. Your team will be empowered to share their knowledge and experience
										at their own pace.
									</p>
								</Modal.Description>
							</Modal.Content>
						</Modal>
					</LearnTopic>
					<LearnTopic>
						<CheckImg src={checkMarkOff} alt='checkMarkOff' />
						<Modal size='tiny' trigger={<Paragraph>What are spaces and how do I use them? </Paragraph>}>
							<ModalImg>
								<Image src={mobileImg} size='medium' centered />
							</ModalImg>
							<Modal.Header>What are spaces and how do I use them?</Modal.Header>
							<Modal.Content>
								<Modal.Description>
									<p>
										Spaces help you organize and discover threads. They help your team stay focused
										and find discussions that are relevant to them. Create spaces for topics,
										projects or teams. Start with a few spaces, invite your teammates and add more
										as needed.
									</p>
								</Modal.Description>
							</Modal.Content>
						</Modal>
					</LearnTopic>
					<LearnTopic>
						<CheckImg src={checkMarkOff} alt='checkMarkOff' />
						<Modal size='tiny' trigger={<Paragraph>What threads should I write?</Paragraph>}>
							<ModalImg>
								<Image src={voiceImg} size='medium' centered />
							</ModalImg>
							<Modal.Header>What threads should I write?</Modal.Header>
							<Modal.Content>
								<Modal.Description>
									<p>
										Threads enable you to share context and have effective discussions. You can
										write a thread to share an important update with your team, to discuss an
										important topic or to make an informed and collaborative decision.
									</p>
								</Modal.Description>
							</Modal.Content>
						</Modal>
					</LearnTopic>
				</LearnMore>
			</StyledContainer>
		);
	}
}

const Paragraph = styled.p`padding-left: 10px;`;
const CheckImg = styled.img`height: 12px;`;
const SearchSpace = styled.div`height: 10hv;`;
const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	background-color: #faf9f7;
	color: #3d4856;
	width: 100%;
	height: 100%;
	padding: 10%;
`;
const GetStarted = styled.div`
	border-radius: 15px;
	-webkit-box-shadow: 0px 15px 35px -34px rgba(92, 92, 91, 1);
	-moz-box-shadow: 0px 15px 35px -34px rgba(92, 92, 91, 1);
	box-shadow: 0px 15px 35px -34px rgba(92, 92, 91, 1);
`;
const GetStartedTop = styled.div`
	background-color: #6c48f2;
	border-radius: 15px 15px 0 0;
	color: white;
	text-align: end;
	font-weight: 700;
	display: flex;
	justify-content: space-around;
	align-items: center;
`;
const PlantImg = styled.img`
	height: 80px;
	padding-top: 15px;
`;
const GetStartedCheckboxes = styled.div`
	background-color: white;
	border-radius: 0 0 15px 15px;
	padding: 10px;
`;
const GetStartedCheck = styled.div`
	display: flex;
	align-items: center;
	padding: 5px;
`;
const LearnMore = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	font-weight: 700;
`;
const LearnTopic = styled.div`
	cursor: pointer;
	border-radius: 5px;
	background-color: white;
	display: flex;
	align-items: center;
	padding: 15px;
	margin-top: 7px;
	-webkit-box-shadow: 0px 15px 35px -34px rgba(92, 92, 91, 1);
	-moz-box-shadow: 0px 15px 35px -34px rgba(92, 92, 91, 1);
	box-shadow: 0px 15px 35px -34px rgba(92, 92, 91, 1);
`;
const ModalImg = styled.div`padding: 20px 0;`;
