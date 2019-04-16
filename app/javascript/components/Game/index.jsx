import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Spinner } from 'reactstrap';
import useProfile from '../../hooks/useProfile';
import MainContainer from '../MainContainer';
import { Link } from 'react-router-dom';

const Game = () => {
  const { profile, loading } = useProfile();

  if (loading) return <Spinner data-testid="game-spinner" />;
  if (profile === undefined) {
    return <Redirect to="/register" />;
  }
  const progressValue =
    profile && profile.id && profile.handle && profile.email
      ? 100
      : profile && profile.id && profile.handle
      ? 50
      : 0;
  return (
    <MainContainer dataTestId="game">
      <h1>coming soon</h1>
      {progressValue === 100 ? (
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
    </MainContainer>
  );
};

export default Game;
