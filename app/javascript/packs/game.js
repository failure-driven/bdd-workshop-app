import React from 'react';

const Game = () => (
  <div>
    <div data-test="message">You are on React</div>
    <div>
      React Version: <span data-test="react-version">{React.version}</span>
    </div>
  </div>
);

export default Game;
