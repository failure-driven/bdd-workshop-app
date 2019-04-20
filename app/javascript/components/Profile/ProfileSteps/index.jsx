import React from 'react';
import Avatar from '../../Avatar';
import ProgressBar from '../../ProgressBar';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import OurForm from '../../OurForm';
import PropTypes from 'prop-types';

const ProfileSteps = ({ profile, onSubmit }) => (
  <div>
    <h1>
      Hi : <span data-testid="details-handle">{profile.handle}</span>
    </h1>
    <p>Your profile is almost complete</p>
    <ProgressBar percentComplete={profile.percentComplete} />
    <Avatar profile={profile} />
    <OurForm onSubmit={onSubmit} profile={profile} />
    <div data-testid="actions">
      <Button tag={Link} to="/game" color="secondary">
        Play the game
      </Button>
    </div>
  </div>
);

ProfileSteps.propTypes = {
  profile: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ProfileSteps;
