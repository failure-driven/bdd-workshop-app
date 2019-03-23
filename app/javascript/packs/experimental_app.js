// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ExperimentalNav from '../components/experimental/ExperimentalNav';
import Navigation from '../components/Navigation';
import Experimental from '../components/experimental';
import ExProfile from '../components/experimental/ExProfile';
import ExHookProfile from '../components/experimental/ExHookProfile';
import MainContainer from '../components/MainContainer';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BrowserRouter>
      <>
        <Navigation />
        <ExperimentalNav />

        <MainContainer>
          <Switch>
            <Route exact path="/experimental" component={Experimental} />
            <Route exact path="/experimental/ExProfile" component={ExProfile} />
            <Route
              exact
              path="/experimental/ExHookProfile"
              component={ExHookProfile}
            />
          </Switch>
        </MainContainer>
      </>
    </BrowserRouter>,
    document.body.appendChild(document.createElement('div'))
  );
});
