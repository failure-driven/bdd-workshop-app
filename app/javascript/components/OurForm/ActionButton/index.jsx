import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

const ActionButton = ({ children, isSubmitting }) => (
  <Button name="submit" color="primary" type="submit" disabled={isSubmitting} className="float-right">
    {children}
  </Button>
);

ActionButton.propTypes = {
  children: PropTypes.node,
  isSubmitting: PropTypes.bool,
};

export default ActionButton;
