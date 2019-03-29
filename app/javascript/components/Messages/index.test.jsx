import React from 'react';
import messagesBus from '../../utils/messageBus';
import Messages from '.';
import { act, render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

describe('Rendres messages to user', () => {
  afterAll(cleanup);

  it('DOM renders danger for error messages', () => {
    const { queryByText } = render(<Messages />);

    act(() => messagesBus.error('something bad happend'));

    expect(queryByText('something bad happend')).toHaveClass('alert-danger');
  });
});
