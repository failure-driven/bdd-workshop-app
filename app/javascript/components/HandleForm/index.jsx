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

const HandleForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ handle: '' }}
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
          <ActionButton isSubmitting={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
};
HandleForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default HandleForm;
