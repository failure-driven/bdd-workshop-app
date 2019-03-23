import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Navigation from '.';
import { MemoryRouter } from 'react-router-dom';

describe('Navigation', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { container } = render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
