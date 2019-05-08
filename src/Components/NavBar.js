import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

export default function NavBar() {
	return (
		<NavBarContainer>
			<InnerContainer className='nav-bar-top'>
				<InnerContainer className='nav-bar-user-information'>
					<img src='http://lorempixel.com/640/480' alt='user' />
					<InnerContainer>Full Name</InnerContainer>
				</InnerContainer>
				<InnerContainer className='notification-icons'>
					<Icon name='cog' />
				</InnerContainer>
			</InnerContainer>
			<InnerContainer className='nav-bar-main-section'>
				<InnerContainer className='home-screen-link'>
					<Icon name='home' />
					<span>Home</span>
				</InnerContainer>
				<InnerContainer className='org-menu'>
					<InnerContainer className='organisation-component'>
						<InnerContainer className='organisation-name'>Organisation name</InnerContainer>
						<InnerContainer className='space'>space 1</InnerContainer>
						<InnerContainer className='space'>space 2</InnerContainer>
						<InnerContainer className='space'>space 3</InnerContainer>
						<InnerContainer className='space'>space 4</InnerContainer>
					</InnerContainer>
				</InnerContainer>
			</InnerContainer>
		</NavBarContainer>
	);
}

const InnerContainer = styled.div`
	border: 1px solid pink;
	padding: 5px;
`;

const NavBarContainer = styled.div`
	border: 1px solid pink;
	padding: 5px;
	height: 100vh;
	width: 15vw;
`;
