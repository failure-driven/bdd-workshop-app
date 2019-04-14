import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import FlakyNav from '../components/BDDFlakyChallenge/FlakyNav';
import MainContainer from '../components/MainContainer';
import Flaky, { FlakyNumber3 } from '../components/BDDFlakyChallenge';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BrowserRouter>
      <>
        <FlakyNav />

        <MainContainer>
          <Switch>
            <Route exact path="/flaky" component={Flaky} />
            <Route exact path="/flaky/number/3" component={FlakyNumber3} />
          </Switch>
        </MainContainer>
      </>
    </BrowserRouter>,
    document.body.appendChild(document.createElement('div'))
  );
});
