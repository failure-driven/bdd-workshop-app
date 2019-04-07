import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Handle from '.';

describe('Handle', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { container } = render(<Handle profile={{ id: 'abc-123' }} />);
    expect(container).toMatchSnapshot();
  });
});
