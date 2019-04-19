import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import RegisterForm from './RegisterForm';

const OurForm = ({ profile, onSubmit }) => {
  const { handle, email, avatarUrl } = profile;
  const step = !handle
    ? 'handle'
    : !email
    ? 'email'
    : !avatarUrl
    ? 'avatar'
    : undefined;
  return (
    <Formik
      initialValues={{ handle, email, avatarUrl }}
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
  profile: { handle: '', email: '', avatarUrl: '' },
};

OurForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    id: PropTypes.string,
    handle: PropTypes.string,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
};

export default OurForm;
