import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Game from '.';
import useProfile from '../../hooks/useProfile';
import { MemoryRouter } from 'react-router-dom';
import 'jest-dom/extend-expect';

jest.mock('../../hooks/useProfile');

describe('Game', () => {
  beforeEach(() => {
    cleanup();
    useProfile.mockReset();
  });

  it('asks for a profile to be created by default', () => {
    useProfile.mockImplementation(() => ({
      profile: undefined,
      loading: false,
    }));
    const { getByTestId } = render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );
    expect(getByTestId('game-status')).toHaveTextContent(
      'Please create a profile first!'
    );
  });

  it('renders coming soon if a user with a profile renders the page', () => {
    useProfile.mockImplementation(() => ({ profile: { id: 'abc-123' } }));
    const { getByTestId } = render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );
    expect(getByTestId('game-status')).toHaveTextContent('coming soon');
  });

  it('renders loading spinner if loading true', () => {
    useProfile.mockImplementation(() => ({
      profile: { id: 'abc-123' },
      loading: true,
    }));
    const { queryByTestId, getByText } = render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );
    expect(queryByTestId('game-status')).toBeNull();
    expect(getByText('Loading...')).toBeTruthy();
  });
});
