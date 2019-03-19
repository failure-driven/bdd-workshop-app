import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

const ErrorAlert = ({ errorMessage }) => (
  <Alert color="danger">Something went wrong - {errorMessage}</Alert>
);
ErrorAlert.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default ErrorAlert;
