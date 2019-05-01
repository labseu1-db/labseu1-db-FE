import styled from 'styled-components';

export const StyledLogin = styled.div`
	margin: 0 auto;
	width: 100%;
	max-width: 1000px;
	border: 1px solid red;
	padding-top: 50px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const StyledForm = styled.form`
	border: 1px solid blue;
	width: 350px;
	padding: 30px 20px;
	display: flex;
	flex-direction: column;
	background-color: white;
	border-radius: 10px;
	/* align-items: flex-end; */
`;

export const StyledInput = styled.input`
	width: 70%
	border: none;
	border-bottom: 1px solid gray;
	padding: 5px 0;
	margin-bottom: 10px;
`;

export const StyledLabel = styled.div`
	display: flex;
	justify-content: space-between;
`;
