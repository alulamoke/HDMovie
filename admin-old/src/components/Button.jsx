import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: auto;
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
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.75;
  }
`;

const Button = ({
  title,
  Icon,
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
      {Icon && (
        <Icon
          size={20}
          style={left ? { marginRight: '1rem' } : { marginLeft: '1rem' }}
        />
      )}
      {title}
    </StyledButton>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Button;
