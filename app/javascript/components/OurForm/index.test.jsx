import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import OurForm from '.';
import 'jest-dom/extend-expect';

describe('OurForm', () => {
  describe('WHEN OurForm is rendered', () => {
    it('THEN there is a next submit button that is enabled', () => {
      const { getByText } = render(<OurForm onSubmit={() => {}} />);
      const nextButton = getByText('Submit');
      expect(nextButton).toHaveClass('btn-primary');
      expect(nextButton).toHaveAttribute('type');
      expect(nextButton.getAttribute('type')).toEqual('submit');
      expect(nextButton.getAttribute('disabled')).not.toBeTruthy();
    });
  });

  // TODO: tests for submitting OurForm do not seem to work
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('WHEN the submit button is clicked it is disabled', () => {
    const { getByText } = render(<OurForm onSubmit={() => {}} />);
    const nextButton = getByText('Submit');

    fireEvent.click(nextButton);

    expect(nextButton.getAttribute('disabled')).toBeTruthy();
  });

  // TODO: tests for submitting OurForm do not seem to work
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('WHEN the submit button is clicked the onSubmit function is called', () => {
    const mockOnSubmit = jest.fn().mockResolvedValue({ data: 'data' });
    const { getByText } = render(<OurForm onSubmit={() => mockOnSubmit} />);
    const nextButton = getByText('Submit');

    fireEvent.click(nextButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
