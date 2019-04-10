import React from 'react';
import { Form } from 'reactstrap';
import PropTypes from 'prop-types';
import ActionButton from '../ActionButton';
import StepFormGroup from '../StepFormGroup';

const HandleStepFormGroup = props => (
  <StepFormGroup
    {...props}
    label="Handle"
    placeholder="input a custom handle"
  />
);

const EmailStepFormGroup = props => (
  <StepFormGroup
    {...props}
    label="Email"
    type="email"
    placeholder="input your email"
  />
);

const RegisterForm = props => (
  <Form onSubmit={props.handleSubmit}>
    {props.step === 'handle' && <HandleStepFormGroup {...props} />}
    {props.step === 'email' && <EmailStepFormGroup {...props} />}
    {!props.step && (
      <>
        <HandleStepFormGroup {...props} step="handle" />
        <EmailStepFormGroup {...props} step="email" />
      </>
    )}
    <ActionButton>{props.step ? 'Sign In' : 'Submit'}</ActionButton>
  </Form>
);
RegisterForm.propTypes = {
  handleSubmit: PropTypes.func,
  step: PropTypes.string,
};

export { HandleStepFormGroup, EmailStepFormGroup };
export default RegisterForm;
