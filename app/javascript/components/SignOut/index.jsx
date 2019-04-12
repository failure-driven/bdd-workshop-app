import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import storage from '../../hooks/useProfile/storage';
import messageBus from '../../utils/messageBus';

const SignOut = ({ fetchProfile }) => {
  const signOutStorage = storage('player');
  signOutStorage.clear();
  fetchProfile();
  messageBus.warn('successfully signed out');
  return <Redirect to="/" />;
};

SignOut.propTypes = {
  fetchProfile: PropTypes.func,
};

SignOut.defaultProps = {
  fetchProfile: () => {},
};

export default SignOut;
