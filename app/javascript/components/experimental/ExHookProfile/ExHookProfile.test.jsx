import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import ExHookProfile from '.';
import useProfile from './useProfile';

jest.mock('./useProfile');

describe('ExHookProfile', () => {
  afterEach(cleanup);

  it('renders loading by default', async () => {
    useProfile.mockReturnValue({ profile: undefined });
    const { getByTestId, queryByTestId } = render(<ExHookProfile />);

    expect(getByTestId('loading')).toHaveTextContent('Loading ...');
    expect(queryByTestId('profile')).toBeNull();
  });

  it('renders profile if one is set', async () => {
    useProfile.mockReturnValue({ profile: { id: 'abc-123' } });
    const { getByTestId, queryByTestId } = render(<ExHookProfile />);

    expect(queryByTestId('loading')).toBeNull();
    expect(getByTestId('profile')).toHaveTextContent('abc-123');
  });
});
