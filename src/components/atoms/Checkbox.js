import React from 'react';
import styled, { css } from 'styled-components';

const StyledLabel = styled.label`
    cursor: pointer;
	display: block;
	height: 60px;

    ${({ item }) =>
    !item.available &&
    css`
        background-color: #3D9970;
        border: none;
        display: block;
        height: 60px;
        position: relative;
        width: 60px;
        :after {
            content: " ";
            display: block;
            height: 10px;
            position: absolute;
            right: 5px;
            width: 10px;
            top: 5px;
        }
    `}

    ${({ item }) =>
    item.gender === 'male' ? css`
        :after {
            background-color: #0074D9;
        }
    ` : css`
        :after {
            background-color: #85144B;
        }
    `}
`;

const StyledInput = styled.input`
    display: block;
	margin: 0 auto;
	position: relative;
	top: 23px;
`;

const Checkbox = ({ item, onClick }) => (
    <StyledLabel item={item} >
        <StyledInput type="checkbox"
                    onClick={onClick} />
    </StyledLabel>
);

export default Checkbox;