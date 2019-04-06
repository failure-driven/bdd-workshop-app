import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

const ActionButton = ({ isSubmitting }) => (
  <Button name="submit" color="primary" type="submit" disabled={isSubmitting}>
    Next
  </Button>
);
ActionButton.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
};

const HandleForm = ({ onSubmit, step }) => {
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
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          { step === 'handle' ?
          <FormGroup>
            <Label for="handle">Handle</Label>
            <Input
              type="text"
              name="handle"
              value={values.handle}
              onChange={handleChange}
              placeholder="input a custom handle"
            />
          </FormGroup>
          : step === 'email' ?
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="input your email"
            />
          </FormGroup>
          : ''}
          <ActionButton isSubmitting={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
};
HandleForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  step: PropTypes.string,
};

export default HandleForm;
