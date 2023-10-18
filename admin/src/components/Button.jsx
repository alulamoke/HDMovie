import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledButton = styled.button`
  display: flex;
  flex-direction: ${(props) => (props.left ? 'row' : 'row-reverse')};
  align-items: center;
  justify-content: center;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  padding: 1.2rem 3rem;
  line-height: 1;
  font-weight: 500;
  font-size: 1.3rem;
  width: auto;
  flex-grow: 0;
  color: ${(props) => (props.solid ? 'var(--text-color)' : props.color)};
  border: ${(props) =>
    props.solid ? '1px solid transparent' : `1px solid ${props.color}`};
  border-radius: 0.4rem;
  background-color: ${(props) => (props.solid ? props.color : 'transparent')};
  box-shadow: ${(props) =>
    props.solid ? '0 1rem 5rem var(--shadow-color)' : 'none'};
  transition: all 600ms cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    transform: translateY(-3px);
    color: ${(props) => (props.solid ? props.color : 'var(--text-color)')};
    border: ${(props) =>
      props.solid ? `1px solid ${props.color}` : '1px solid transparent'};
    background-color: ${(props) => (props.solid ? 'transparent' : props.color)};
    box-shadow: ${(props) =>
      props.solid ? 'none' : '0 1rem 5rem var(--shadow-color)'};
    transition: all 600ms cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  @media ${(props) => props.theme.mediaQueries.large} {
    padding: 1.2rem 2rem;
  }

  @media ${(props) => props.theme.mediaQueries.small} {
    padding: 1.3rem 1.6rem;
  }

  @media ${(props) => props.theme.mediaQueries.smaller} {
    padding: 1rem 1.3rem;
  }

  &:active {
    transform: translateY(2px);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const Button = ({
  title,
  icon,
  color = 'var(--color-primary-dark)',
  left,
  solid,
  ...rest
}) => {
  return (
    <StyledButton
      color={color}
      left={left ? 1 : 0}
      solid={solid ? 1 : 0}
      {...rest}
    >
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          size="1x"
          style={left ? { marginRight: '1rem' } : { marginLeft: '1rem' }}
        />
      )}
      {title}
    </StyledButton>
  );
};

export default Button;
