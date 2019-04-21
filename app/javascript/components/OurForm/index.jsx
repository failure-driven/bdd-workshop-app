import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import RegisterForm from './RegisterForm';

const OurForm = ({ profile, onSubmit }) => {
  const { handle, name, email, avatarUrl } = profile;
  const step = [
    'handle',
    'name',
    'email',
    'avatarUrl',
  ].find((field) => !profile[field])

  return (
    <Formik
      initialValues={{ handle, name, email, avatarUrl }}
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
  profile: { handle: '', name: '', email: '', avatarUrl: '' },
};

OurForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    id: PropTypes.string,
    handle: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
};

export default OurForm;
