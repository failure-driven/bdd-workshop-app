import React from 'react';
import { Spinner } from 'reactstrap';

function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <Spinner color="primary" data-test-id="loading-profile" />
    </div>
  );
}

export default Profile;
