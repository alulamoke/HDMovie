import React from 'react';
import { useSelector } from 'react-redux';
import CustomizedSnackbar from './CustomizedSnackbar';

const Alert = () => {
  const { alerts } = useSelector((state) => state.alert);

  return alerts?.map((alert, index) => {
    return (
      <CustomizedSnackbar
        key={`custom-alert-${index}-${alert.id}`}
        isOpen={true}
        vertical="top"
        horizontal="right"
        variant={alert.alertType}
        message={alert.msg}
      />
    );
  });
};

export default Alert;
