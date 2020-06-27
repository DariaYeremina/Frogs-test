import React from 'react';
import styled from 'styled-components';

const SyledButton = styled.button`
    background-color: #fff;
	border: 1px solid #888;
	border-radius: 3px;
	cursor: pointer;
	font-size: 1.6em;
	padding: 8px 25px;
`;

const Button = ({children, onClick}) => (
    <SyledButton onClick={onClick}>{children}</SyledButton>
);

export default Button;