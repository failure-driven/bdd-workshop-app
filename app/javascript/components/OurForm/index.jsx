import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import RegisterForm from './RegisterForm';

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
