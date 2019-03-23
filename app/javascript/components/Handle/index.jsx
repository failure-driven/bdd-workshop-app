import React from 'react';
import PropTypes from 'prop-types';

const Handle = ({ profile }) => (
  <div data-testid="handle" data-user-id={profile.id}>
    {profile.id.slice(0, 8)}
  </div>
);
Handle.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default Handle;
