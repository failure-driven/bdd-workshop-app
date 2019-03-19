// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import ExProfile from '../components/experimental/ExProfile';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BrowserRouter>
      <>
        <Navigation />
        <Switch>
          <Route exact path="/experimental" component={ExProfile} />
        </Switch>
      </>
    </BrowserRouter>,
    document.body.appendChild(document.createElement('div'))
  );
});
