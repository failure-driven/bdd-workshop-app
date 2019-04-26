import React from 'react';
import { Redirect } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import useProfile from '../../hooks/useProfile';
import MainContainer from '../MainContainer';
import GameProfile from '../Profile/GameProfile';

const Game = () => {
  const { profile, loading } = useProfile();

  if (loading) return <Spinner data-testid="game-spinner" />;
  if (profile === undefined) {
    return <Redirect to="/register" />;
  }
  return (
    <MainContainer dataTestId="game">
      <h1>coming soon</h1>
      <GameProfile profile={profile} />
    </MainContainer>
  );
};

export default Game;
