import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import plusIcon from '../images/icon-plus-lightgray.svg';

export default function NavBar() {
	return (
		<NavBarContainer>
			<HeaderContainer className='nav-bar-user-information'>
				<InnerContainerHorizontal>
					<StyledImage src='http://lorempixel.com/640/480' alt='user' />
					<div>Samar Vir</div>
					<Icon name='chevron down' size='small' />
				</InnerContainerHorizontal>
				<div>
					<Icon name='cog' />
				</div>
			</HeaderContainer>

			<InnerContainer className='nav-bar-main-section'>
				<HomeContainer className='home-screen-link'>
					<Icon name='home' size='large' />
					<span>Home</span>
				</HomeContainer>

				<div className='org-menu'>
					<div className='organisation-component'>
						<OuterOrgContainer>
							<OrgContainer className='organisation-name'>
								<Icon name='building outline' size='large' />
								<span>Organisation name</span>
								<Icon name='chevron down' size='small' />
							</OrgContainer>
							<div>
								<img src={plusIcon} alt='plus icon' />
							</div>
						</OuterOrgContainer>
						<SpaceContainer>
							<div>
								<span>Space 1</span>
							</div>
							<div>
								<span>Space 2</span>
							</div>
							<div>
								<span>Space 3</span>
							</div>
							<div>
								<span>Space 4</span>
							</div>
						</SpaceContainer>
					</div>
				</div>
			</InnerContainer>
		</NavBarContainer>
	);
}

const HeaderContainer = styled.div`
	padding-left: 32px;
	padding-right: 32px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	div:nth-child(2) {
		&:hover {
			cursor: pointer;
		}
	}
`;

const InnerContainerHorizontal = styled.div`
	display: flex;
	align-items: center;
	div {
		margin-right: 8px;
	}
	&:hover {
		cursor: pointer;
		font-weight: 600;
		box-shadow: 3px 3px 13px -10px #000;
		border-radius: 16px;
		.chevron {
			color: #f64e49;
		}
		/* box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.1); */
	}
	div {
		color: rgb(55, 71, 80);
	}
`;

const InnerContainer = styled.div`
	padding-top: 40px;
	padding-left: 32px;
	padding-bottom: 16px;
`;

const HomeContainer = styled.div`
	padding-left: 4px;
	display: flex;
	align-items: baseline;
	span {
		padding-left: 12px;
	}
	span:hover {
		color: #f64e49;
		cursor: pointer;
	}
`;

const OrgContainer = styled.div`
	margin-top: 20px;
	margin-bottom: 8px;
	padding-top: 6px;
	padding-bottom: 6px;
	padding-left: 4px;
	display: flex;
	align-items: center;
	align-items: baseline;
	color: rgb(55, 71, 80);
	font-size: 14px;
	font-weight: 600;
	span {
		padding-right: 8px;
		padding-left: 12px;
	}
	&:hover {
		cursor: pointer;
		border-radius: 16px;
		box-shadow: 3px 3px 13px -10px #000;
		.chevron {
			color: #f64e49;
		}
	}
`;

const OuterOrgContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: baseline;
	justify-content: space-between;
	div:nth-child(2) {
		display: flex;
		align-items: flex-end;
	}
	img {
		width: 1.25rem;
		margin-right: 8px;
		margin-right: 20px;
		&:hover {
			cursor: pointer;
		}
	}
`;

const SpaceContainer = styled.div`
	margin-left: 8px;
	line-height: 30px;
	span {
		margin-left: 40px;
		&:hover {
			color: #f64e49;
			cursor: pointer;
		}
	}
`;

const NavBarContainer = styled.div`
	border: 1px solid pink;
	height: 100vh;
	width: 309px;
	padding-top: 32px;
	font-family: 'Open Sans', Helvetica, Arial, 'sans-serif';
	color: #9c9c9c;
	font-size: 13px;
`;

const StyledImage = styled.img`
	height: 32px;
	width: 32px;
	border-radius: 50%;
	margin-right: 8px;
`;
