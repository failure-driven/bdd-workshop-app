import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from '../Game';
import Profile from '../Profile';
import MainContainer from '../MainContainer';

const Routes = () => (
  <MainContainer>
    <Switch>
      <Route exact path="/" component={Game} />
      <Route exact path="/profile" component={Profile} />
    </Switch>
  </MainContainer>
);

export default Routes;
