import React from 'react';
import MainContainer from '../MainContainer';
import HandleForm from '../HandleForm';
import messageBus from '../../utils/messageBus';
import {loginAsUser} from '../API';
import PropTypes from 'prop-types';

const SignIn = ({fetchProfile, history}) => {
  const onFormSubmit = (formData) => {
    return loginAsUser(formData).then(({ data: { id, handle }}) => {
      localStorage.setItem('player', JSON.stringify({id: id, handle: handle}));
      messageBus.info('signed in successfully');
      fetchProfile();
      history.push('/game')
    })
  };

  return (
    <MainContainer dataTestId='sign-up'>
      <h1>Please sign in to continue!</h1>
      <HandleForm onSubmit={onFormSubmit} step="handle" />
    </MainContainer>
  )
};

SignIn.propTypes = {
  fetchProfile: PropTypes.func,
  history: PropTypes.object,
};

export default SignIn;