import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from '../Game';
import Profile from '../Profile';
import PropTypes from 'prop-types';

const MainContainer = ({ children }) => <main className="m-5">{children}</main>;
MainContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const Routes = () => (
  <MainContainer>
    <Switch>
      <Route exact path="/" component={Game} />
      <Route exact path="/profile" component={Profile} />
    </Switch>
  </MainContainer>
);

export default Routes;
