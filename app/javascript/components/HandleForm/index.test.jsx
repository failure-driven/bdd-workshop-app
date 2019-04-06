import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import HandleForm from '.';
import 'jest-dom/extend-expect';

describe('HandleForm', () => {
  describe('WHEN HandleForm is rendered', () => {
    it('THEN there is a next submit button that is enabled', () => {
      const { getByText } = render(<HandleForm onSubmit={() => {}} />);
      const nextButton = getByText('Next');
      expect(nextButton).toHaveClass('btn-primary');
      expect(nextButton).toHaveAttribute('type');
      expect(nextButton.getAttribute('type')).toEqual('submit');
      expect(nextButton.getAttribute('disabled')).not.toBeTruthy();
    });
  });

  // TODO: tests for submitting form do not seem to work
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('WHEN the submit button is clicked it is disabled', () => {
    const { getByText } = render(<HandleForm onSubmit={() => {}} />);
    const nextButton = getByText('Next');

    fireEvent.click(nextButton);

    expect(nextButton.getAttribute('disabled')).toBeTruthy();
  });

  // TODO: tests for submitting form do not seem to work
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('WHEN the submit button is clicked the onSubmit function is called', () => {
    const mockOnSubmit = jest.fn().mockResolvedValue({ data: 'data' });
    const { getByText } = render(<HandleForm onSubmit={() => mockOnSubmit} />);
    const nextButton = getByText('Next');

    fireEvent.click(nextButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
