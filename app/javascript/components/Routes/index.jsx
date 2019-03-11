import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from '../Game';
import Profile from '../Profile';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Game} />
    <Route exact path="/profile" component={Profile} />
  </Switch>
);

export default Routes;
