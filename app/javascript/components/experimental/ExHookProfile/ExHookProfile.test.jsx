import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import ExHookProfile from '.';

describe('ExHookProfile', () => {
  afterEach(cleanup);

  it('set transitions from Loading to Hello', async () => {
    const { getByTestId, getByText } = render(<ExHookProfile />);

    expect(getByTestId('span')).toHaveTextContent('Loading ...');

    fireEvent.click(getByText('set'));

    expect(getByTestId('span')).toHaveTextContent('hello');
  });
});
