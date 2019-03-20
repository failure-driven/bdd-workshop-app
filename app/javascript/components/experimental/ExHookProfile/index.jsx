import React from 'react';
import PropTypes from 'prop-types';
import useProfile from './useProfile';

const Loading = ({ setProfile }) => (
  <>
    <span data-testid="span">Loading ...</span>
    <a
      className="btn btn-secondary"
      onClick={() => {
        setProfile('hello');
      }}
    >
      set
    </a>
  </>
);
Loading.propTypes = {
  setProfile: PropTypes.func,
};

const UnsetProfile = ({ profile, setProfile }) => (
  <>
    <span data-testid="span">{profile}</span>
    <a className="btn btn-secondary" onClick={() => setProfile()}>
      unset
    </a>
  </>
);
UnsetProfile.propTypes = {
  profile: PropTypes.string,
  setProfile: PropTypes.func,
};

const ExHookProfile = () => {
  const { profile, setProfile } = useProfile();

  if (!profile) return <Loading setProfile={setProfile} />;
  return <UnsetProfile setProfile={setProfile} profile={profile} />;
};

export default ExHookProfile;
