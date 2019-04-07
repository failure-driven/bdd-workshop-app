import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import RegisterForm from './RegisterForm';

const OurForm = ({ profile, onSubmit, step }) => {
  const { handle, email } = profile;
  return (
    <Formik
      initialValues={{ handle, email }}
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

OurForm.defaultProps = {
  profile: { handle: '', email: '' },
};

OurForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  step: PropTypes.string,
  profile: PropTypes.shape({
    id: PropTypes.string,
    handle: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default OurForm;
