import React from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import ActionButton from './ActionButton';

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
    <ActionButton {...props}>Next</ActionButton>
  </Form>
);
RegisterForm.propTypes = {
  handleSubmit: PropTypes.func,
  step: PropTypes.string,
};

const OurForm = ({ onSubmit, step }) => {
  return (
    <Formik
      initialValues={{ handle: '', email: '' }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        event.preventDefault();
        onSubmit(values).then(() => {
          setSubmitting(false);
        });
      }}
    >
      {props => <RegisterForm step={step} {...props} />}
    </Formik>
  );
};
OurForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  step: PropTypes.string,
};

export default OurForm;
