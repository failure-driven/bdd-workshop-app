import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from '../Game';
import About from '../About';
import Profile from '../Profile';
import SignIn from '../SignIn';
import Register from '../Register';
import WarGamesIntro from '../WarGamesIntro';

const Routes = (props) => (
  <Switch>
    <Route exact path="/" component={WarGamesIntro} />
    <Route exact path="/register" render={(routeProps) => <Register {...props} {...routeProps} />} />
    <Route exact path="/sign_in" render={(routeProps) => <SignIn {...props} {...routeProps} />} />
    <Route exact path="/profile" render={(routeProps) => <Profile {...props} {...routeProps} />} />
    <Route exact path="/game" component={Game} />
    <Route exact path="/about" component={About} />
  </Switch>
);

export default Routes;
