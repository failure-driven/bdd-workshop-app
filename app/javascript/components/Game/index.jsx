import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const Game = () => (
  <div data-testid="game">
    <div data-testid="game-status">Please create a profile first!</div>
    <Button color="primary" tag={Link} to="/profile">
      Create Profile NOW!
    </Button>
  </div>
);

export default Game;
