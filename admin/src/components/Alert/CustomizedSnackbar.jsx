import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Snackbar = styled.div`
  position: fixed;
  display: ${({ open }) => (open ? 'block' : 'none')};
  top: ${({ vertical }) => vertical === 'top' && '1.5%'};
  right: ${({ horizontal }) => horizontal === 'right' && '1.5%'};
  bottom: ${({ vertical }) => vertical === 'bottom' && '1.5%'};
  left: ${({ horizontal }) => horizontal === 'left' && '1.5%'};
  z-index: 99999;
  cursor: pointer;
  user-select: none;
`;

const SnackbarContentWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  padding: 2rem;
  text-transform: capitalize;
  box-shadow: 0 0 7px 3px rgba(150, 150, 150, 0.75);
  border-radius: 3px;

  background-color: ${({ variant }) => {
    switch (variant) {
      case 'success':
        return '#00b100';
      case 'error':
        return '#e20c0c';
      case 'warning':
        return '#ff9800';
      case 'info':
        return '#1297ff';
      default:
        break;
    }
  }};
`;

const Text = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  margin-left: 1rem;
`;

const CustomizedSnackbar = ({
  isOpen,
  vertical,
  horizontal,
  variant,
  message,
}) => {
  function renderIcon() {
    let icon;
    switch (variant) {
      case 'success':
        icon = 'check-circle';
        break;
      case 'error':
        icon = 'exclamation-circle';
        break;
      case 'warning':
        icon = 'exclamation-triangle';
        break;
      case 'info':
        icon = 'info-circle';
        break;
      default:
        break;
    }
    return <FontAwesomeIcon icon={icon} style={{ fontSize: '2.5rem' }} />;
  }

  return (
    <Snackbar vertical={vertical} horizontal={horizontal} open={isOpen}>
      <SnackbarContentWrapper variant={variant}>
        {renderIcon()}
        <Text>{message}</Text>
      </SnackbarContentWrapper>
    </Snackbar>
  );
};

CustomizedSnackbar.propTypes = {
  isOpen: PropTypes.bool,
  vertical: PropTypes.string,
  horizontal: PropTypes.string,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
  message: PropTypes.string,
};
export default CustomizedSnackbar;
