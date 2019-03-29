// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Routes from '../components/Routes';
import Messages from '../components/Messages';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BrowserRouter>
      <>
        <Navigation />
        <Messages />
        <Routes />
      </>
    </BrowserRouter>,
    document.body.appendChild(document.createElement('div'))
  );
});
