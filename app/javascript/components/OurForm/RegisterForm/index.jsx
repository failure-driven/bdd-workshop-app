import React from 'react';
import { Form } from 'reactstrap';
import PropTypes from 'prop-types';
import ActionButton from '../ActionButton';
import StepFormGroup from '../StepFormGroup';

const RegisterForm = props => (
  <Form onSubmit={props.handleSubmit}>
    {(props.step === 'handle' || !props.step) && (
      <StepFormGroup
        {...props}
        step="handle"
        label="Handle"
        placeholder="input a custom handle"
      />
    )}
    {(props.step === 'name' || !props.step) && (
      <StepFormGroup
        {...props}
        step="name"
        label="Name"
        placeholder="input your name"
      />
    )}
    {(props.step === 'email' || !props.step) && (
      <StepFormGroup
        {...props}
        step="email"
        label="Email"
        type="email"
        placeholder="input your email"
      />
    )}
    {(props.step === 'avatar' || !props.step) && (
      <StepFormGroup
        {...props}
        step="avatarUrl"
        label="Avatar"
        placeholder="url to your avatar"
      />
    )}
    <ActionButton>{props.step ? 'Next' : 'Submit'}</ActionButton>
  </Form>
);
RegisterForm.propTypes = {
  handleSubmit: PropTypes.func,
  step: PropTypes.string,
};

export default RegisterForm;
