import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const GameProfile = ({ profile }) => {
  return (
    <>
      {profile.percentComplete === 100 ? (
        <p>Your profile is complete!</p>
      ) : (
        <Button
          data-testid="actions"
          tag={Link}
          to="/profile"
          className="float-right"
          color="primary"
        >
          Complete my profile
        </Button>
      )}
    </>
  );
};

GameProfile.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default GameProfile;
