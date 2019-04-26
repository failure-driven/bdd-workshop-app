import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import App from '.';
import useProfile from '../../hooks/useProfile';

jest.mock('../../hooks/useProfile');
jest.mock('../../components/Routes', () =>
  jest.fn(({ profile }) => <div profile={profile} data-testid="mock-routes" />)
);

describe('App', () => {
  afterEach(cleanup);

  it('Renders a spinner WHEN in loading state', () => {
    useProfile.mockReturnValue({ profile: undefined, loading: true });
    const { queryByTestId } = render(<App />);

    expect(queryByTestId('spinner')).toHaveTextContent('Loading...');
    expect(queryByTestId('mock-routes')).toBeNull();
  });

  it('Renders the route WHEN loaded', () => {
    useProfile.mockReturnValue({
      profile: { the: 'profile' },
      loading: false,
      fetchProfile: jest.fn(),
    });
    const { queryByTestId } = render(<App />);

    expect(queryByTestId('spinner')).toBeNull();
    expect(queryByTestId('mock-routes')).toHaveTextContent('');
    expect(queryByTestId('mock-routes')).toHaveAttribute('profile');
  });
});
