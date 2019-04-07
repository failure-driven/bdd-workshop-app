import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import PropTypes from 'prop-types';

const StepFormGroup = ({
  step,
  label,
  type,
  placeholder,
  values,
  handleChange,
}) => (
  <FormGroup>
    <Label for={step}>{label}</Label>
    <Input
      type={type || 'text'}
      name={step}
      value={values[step]}
      onChange={handleChange}
      placeholder={placeholder}
    />
  </FormGroup>
);
StepFormGroup.propTypes = {
  step: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  values: PropTypes.object,
  handleChange: PropTypes.func,
};

export default StepFormGroup;
