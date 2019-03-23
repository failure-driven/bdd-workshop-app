import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Spinner } from 'reactstrap';
import useProfile from '../../hooks/useProfile';

const Game = () => {
  const { profile, loading } = useProfile();

  if (loading) return <Spinner data-testid="game-spinner" />;
  if (profile === undefined) {
    return (
      <div data-testid="game">
        <div data-testid="game-status">Please create a profile first!</div>
        <Button color="primary" tag={Link} to="/profile">
          Create Profile NOW!
        </Button>
      </div>
    );
  }
  return <div data-testid="game-status">coming soon</div>;
};

export default Game;
