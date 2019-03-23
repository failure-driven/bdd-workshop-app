import React from 'react';
import { render, cleanup } from 'react-testing-library';
import About from '.';
import 'jest-dom/extend-expect';

jest.mock('../../hooks/useProfile');

describe('About', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders the about page', () => {
    const { container } = render(<About />);
    expect(container).toMatchSnapshot();
  });
});
