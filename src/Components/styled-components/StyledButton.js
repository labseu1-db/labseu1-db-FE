import styled from 'styled-components';

export const StyledButton = styled.button`
	font-size: 1.3rem;
	width: 105px;
	padding: 5px 15px;
	background-color: var(--main-color);
	color: white;
	border-radius: 15px;
	border: none;
	cursor: pointer;
	&:disabled {
		background-color: var(--disabled-button);
	}
`;

export const ForgotPasswordButton = styled.div`
	font-family: 'Open Sans', sans-serif;
	padding-left: 125px;
	color: var(--dgray-color);
	font-size: 0.8rem;
	font-weight: 300;
	background: none;
	border: none;
	cursor: pointer;
	&:hover {
		color: var(--main-color);
	}
`;

export const PasswordlessButton = styled.button`
	font-family: 'Open Sans', sans-serif;
	color: var(--dgray-color);
	font-size: 0.8rem;
	font-weight: 300;
	margin: 20px;
	background: none;
	border: none;
	padding: 0;
	cursor: pointer;
	&:hover {
		color: var(--main-color);
	}
`;
