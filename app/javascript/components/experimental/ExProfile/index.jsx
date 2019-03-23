import React, { Suspense } from 'react';
import { Spinner } from 'reactstrap';
import { useFetch } from 'react-hooks-fetch';
import ErrorAlert from '../../ErrorAlert';

const Loading = () => <Spinner color="primary" data-testid="loading-profile" />;

const Profile = () => {
  const url = '/api/v1/profiles';
  const player =
    localStorage.getItem('player') !== 'undefined' &&
    JSON.parse(localStorage.getItem('player'));
  const { error, data } = player
    ? useFetch(`${url}/${player.id}`)
    : [false, null];
  if (error) return <ErrorAlert errorMessage={error.message} />;
  if (!data) return null;
  return (
    <>
      <h1>Profile</h1>
      <span data-testid="user-id">{data.id}</span>
    </>
  );
};

const ExProfile = () => (
  <Suspense fallback={<Loading />}>
    <Profile />
  </Suspense>
);

export default ExProfile;
