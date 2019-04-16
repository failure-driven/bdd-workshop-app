import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Typist from 'react-typist';
import MainContainer from '../MainContainer';

const WarGamesIntro = () => (
  <MainContainer dataTestId="home">
    <h1>Play with me?</h1>
    <Link className="jumbotron-link" to="/game" data-testid="game-start">
      <Jumbotron data-testid="wargames" className="m-3">
        <div className="p-3 wargames-dotty">
          <Typist>
            Games make mistakes.
            <div className="question">SHALL WE PLAY A GAME?</div>
          </Typist>
        </div>
        <div className="pt-3">
          <Button color="primary" className="float-right">
            Play Game
          </Button>
        </div>
      </Jumbotron>
    </Link>
  </MainContainer>
);
export default WarGamesIntro;
