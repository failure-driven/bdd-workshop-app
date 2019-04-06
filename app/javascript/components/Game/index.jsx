import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Spinner } from 'reactstrap';
import useProfile from '../../hooks/useProfile';
import Handle from '../Handle';

const Game = () => {
  const { profile, loading } = useProfile();

  if (loading) return <Spinner data-testid="game-spinner" />;
  if (profile === undefined) {
    return (
      <Redirect to="/register" />
    );
  }
  return (
    <>
      <div data-testid="game-status">coming soon</div>
      <Handle profile={profile} />
      <p data-testid="profile-upsell">
        customize your profile with custom handle and image
      </p>
      <Button color="primary" tag={Link} to="/profile">
        Customize Profile!
      </Button>
    </>
  );
};

export default Game;
