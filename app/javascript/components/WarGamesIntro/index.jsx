import React from 'react';
import { Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom';
import Typist from 'react-typist';

const WarGamesIntro = () => (
  <Link className="jumbotron-link" to="/game" data-testid="game-start">
    <Jumbotron data-testid="main-content" className="m-3">
      <div className="p-3 wargames-dotty">
        <Typist>
          Games make mistakes.
          <div className="question">SHALL WE PLAY A GAME?</div>
        </Typist>
      </div>
    </Jumbotron>
  </Link>
);
export default WarGamesIntro;
