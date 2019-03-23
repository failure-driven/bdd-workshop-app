import React from 'react';
import useProfile from './useProfile';

const Loading = () => <span data-testid="loading">Loading ...</span>;

const ExHookProfile = () => {
  const { profile } = useProfile();

  if (!profile) return <Loading />;
  return <span data-testid="profile">{profile.id}</span>;
};

export default ExHookProfile;
