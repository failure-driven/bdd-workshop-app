import React, { Suspense } from 'react';
import { Spinner } from 'reactstrap';
import { useFetch } from 'react-hooks-fetch';

const Loading = () => <Spinner color="primary" data-testid="loading-profile" />;

const Profile = () => {
  const url = '/api/v1/profiles';
  const player =
    localStorage.getItem('player') !== 'undefined' &&
    JSON.parse(localStorage.getItem('player'));
  const { data } = player ? useFetch(`${url}/${player.id}`) : [false, null];

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
