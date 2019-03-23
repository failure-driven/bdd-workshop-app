import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from '../Game';
import About from '../About';
import Profile from '../Profile';
import MainContainer from '../MainContainer';
import WarGamesIntro from '../WarGamesIntro';

const Routes = () => (
  <MainContainer>
    <Switch>
      <Route exact path="/" component={WarGamesIntro} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/game" component={Game} />
      <Route exact path="/about" component={About} />
    </Switch>
  </MainContainer>
);

export default Routes;
