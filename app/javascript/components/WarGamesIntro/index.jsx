import React from 'react';
import { Jumbotron } from 'reactstrap';

const WarGamesIntro = () => (
  <Jumbotron data-test-id="main-content" className="m-3">
    <div className="p-3 wargames-dotty">
      <div>Games make mistakes.</div>
      <div className="question">SHALL WE PLAY A GAME?</div>
    </div>
  </Jumbotron>
);
export default WarGamesIntro;
