import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

export default function NavBar() {
	return (
		<NavBarContainer>
			<HeaderContainer className='nav-bar-user-information'>
				<InnerContainerHorizontal>
					<StyledImage src='http://lorempixel.com/640/480' alt='user' />
					<InnerContainer>Full Name</InnerContainer>
					<Icon name='arrow down' />
				</InnerContainerHorizontal>
				<div>
					<Icon name='cog' />
				</div>
			</HeaderContainer>
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

const HeaderContainer = styled.div`
	width: 100%;
	border: 1px solid pink;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const InnerContainerHorizontal = styled.div`
	border: 1px solid pink;
	display: flex;
	align-items: center;
`;

const InnerContainer = styled.div`border: 1px solid pink;`;

const NavBarContainer = styled.div`
	border: 1px solid pink;
	height: 100vh;
	width: 15vw;
`;


const StyledImage = styled.img`
	height: 50px;
	width: 50px;
	border-radius: 50%;
`;

