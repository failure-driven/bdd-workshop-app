import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Navigation from '.';
import { MemoryRouter } from 'react-router-dom';

describe('Navigation', () => {
  afterEach(() => {
    cleanup();
  });

  it('Renders default unregistered view', () => {
    const { container } = render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
    // TODO actualy test for the Sign in and Register links
  });

  it('Renders signed in view', () => {
    const { container } = render(
      <MemoryRouter>
        <Navigation profile={{ profile: 'thing' }} />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
    // TODO actualy test for the Profile and Sign out links
  });
});
