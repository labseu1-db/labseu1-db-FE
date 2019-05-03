import styled from 'styled-components';

export const StyledButton = styled.button`
	font-size: 1.3rem;
	width: 105px;
	padding: 5px 15px;
	background-color: #6c48f2;
	color: white;
	border-radius: 15px;
	border: none;
	cursor: pointer;
	&:disabled {
		background-color: lightgray;
	}
`;

export const ForgotPasswordButton = styled.button`
	font-family: 'Open Sans', sans-serif;
	padding-right: 75px;
	color: black;
	font-size: 0.8rem;
	font-weight: 300;
	background: none;
	border: none;
	cursor: pointer;
	&:hover {
		color: #6c48f2;
	}
`;

export const PasswordlessButton = styled.button`
	font-family: 'Open Sans', sans-serif;
	color: black;
	font-size: 0.8rem;
	font-weight: 300;
	margin: 20px;
	background: none;
	border: none;
	padding: 0;
	cursor: pointer;
	&:hover {
		color: #6c48f2;
	}
`;
