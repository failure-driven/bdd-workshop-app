import React from 'react';
import MainContainer from '../MainContainer';
import OurForm from '../OurForm';
import messageBus from '../../utils/messageBus';
import { loginAsUser } from '../API';
import PropTypes from 'prop-types';

const SignIn = ({ fetchProfile, history }) => {
  const onOurFormSubmit = OurFormData => {
    return loginAsUser(OurFormData)
      .then(({ data: { id, handle } }) => {
        localStorage.setItem(
          'player',
          JSON.stringify({ id: id, handle: handle })
        );
        messageBus.info('signed in successfully');
        fetchProfile();
        history.push('/game');
      })
      .catch(res => {
        const errors = res.response.data.errors;
        const messages = Array.isArray(errors)
          ? errors.map(e => e.detail).join()
          : Object.keys(errors)
              .map(key => [key, errors[key]].join(': '))
              .join();
        messageBus.error(messages);
      });
  };

  return (
    <MainContainer dataTestId="sign-in">
      <h1>Please sign in to continue!</h1>
      <OurForm onSubmit={onOurFormSubmit} step="handle" />
    </MainContainer>
  );
};

SignIn.propTypes = {
  fetchProfile: PropTypes.func,
  history: PropTypes.object,
};

export default SignIn;
