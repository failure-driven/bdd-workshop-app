import React from 'react';
import { Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom';

const WarGamesIntro = () => (
  <Link className="jumbotron-link" to="/game" data-testid="game-start">
    <Jumbotron data-test-id="main-content" className="m-3">
      <div className="p-3 wargames-dotty">
        <div>Games make mistakes.</div>
        <div className="question">SHALL WE PLAY A GAME?</div>
      </div>
    </Jumbotron>
  </Link>
);
export default WarGamesIntro;
