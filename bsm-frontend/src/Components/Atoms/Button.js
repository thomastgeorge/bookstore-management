import React from 'react';
import styled from "styled-components";

function Button(props){
    return (
        <CustomButton
            {...props}
            style={props.style}
            onClick={props.onClick}
            disabled={props.disabled}
            width={props.width}
            height={props.height}
            className={props.className}
        >
            {props.children}
        </CustomButton>
    )
} 

export const CustomButton = styled.button`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  outline: none;
  cursor: default;
  margin: 0;
  padding: 0;
`;


export default Button; 