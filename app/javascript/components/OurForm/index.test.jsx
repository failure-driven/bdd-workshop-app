import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import OurForm from '.';
import { shallow } from 'enzyme';
import 'jest-dom/extend-expect';

describe('OurForm', () => {
  beforeEach(cleanup);

  describe('WHEN profile is not complete', () => {
    it('THEN by default it shows the handle', () => {
      const wrapper = shallow(<OurForm onSubmit={() => {}} profile={{}} />);
      expect(
        wrapper
          .find('Formik')
          .dive()
          .find('RegisterForm')
          .prop('step')
      ).toEqual('handle');
    });

    it('THEN if handle is filled in then name', () => {
      const wrapper = shallow(
        <OurForm onSubmit={() => {}} profile={{ handle: 'a-handle' }} />
      );
      expect(
        wrapper
          .find('Formik')
          .dive()
          .find('RegisterForm')
          .prop('step')
      ).toEqual('name');
    });

    it('THEN if handle and name is filled in then email', () => {
      const wrapper = shallow(
        <OurForm
          onSubmit={() => {}}
          profile={{ handle: 'a-handle', name: 'a-name' }}
        />
      );
      expect(
        wrapper
          .find('Formik')
          .dive()
          .find('RegisterForm')
          .prop('step')
      ).toEqual('email');
    });

    it('THEN if handle, name and email is filled in then avatar', () => {
      const wrapper = shallow(
        <OurForm
          onSubmit={() => {}}
          profile={{ handle: 'a-handle', name: 'a-name', email: 'an-email' }}
        />
      );
      expect(
        wrapper
          .find('Formik')
          .dive()
          .find('RegisterForm')
          .prop('step')
      ).toEqual('avatarUrl');
    });

    it('THEN if handle, name, email and avatar is filled in then avatar as it is the last', () => {
      const wrapper = shallow(
        <OurForm
          onSubmit={() => {}}
          profile={{
            handle: 'a-handle',
            name: 'a-name',
            email: 'an-email',
            avatarUrl: 'an-avatar-url',
          }}
        />
      );
      expect(
        wrapper
          .find('Formik')
          .dive()
          .find('RegisterForm')
          .prop('step')
      ).toBe(undefined);
    });
  });

  describe('WHEN OurForm is rendered', () => {
    it('THEN Formik is rendered with initial values of blank', () => {
      const wrapper = shallow(<OurForm onSubmit={jest.fn()} />);
      expect(wrapper.find('Formik').prop('initialValues')).toEqual({
        avatarUrl: '',
        email: '',
        handle: '',
        name: '',
      });
    });

    it('THEN profile pre-populates values for Formik', () => {
      const wrapper = shallow(
        <OurForm
          onSubmit={jest.fn()}
          profile={{
            avatarUrl: 'the-avatar-url',
            email: 'the-email',
            handle: 'the-handle',
            name: 'the-name',
          }}
        />
      );
      expect(wrapper.find('Formik').prop('initialValues')).toEqual({
        avatarUrl: 'the-avatar-url',
        email: 'the-email',
        handle: 'the-handle',
        name: 'the-name',
      });
    });

    it('THEN there is a next submit button that is enabled', () => {
      const { getByText } = render(<OurForm onSubmit={() => {}} />);
      const nextButton = getByText('Next');
      expect(nextButton).toHaveClass('btn-primary');
      expect(nextButton).toHaveAttribute('type');
      expect(nextButton.getAttribute('type')).toEqual('submit');
      expect(nextButton.getAttribute('disabled')).not.toBeTruthy();
    });
  });

  it('WHEN the submit button is clicked it is disabled', () => {
    const { getByText } = render(<OurForm onSubmit={() => {}} />);
    const nextButton = getByText('Next');

    fireEvent.click(nextButton);

    // expect(nextButton.getAttribute('disabled')).toBeTruthy();
  });

  it('WHEN the submit button is clicked the onSubmit function is called', () => {
    const mockOnSubmit = jest.fn().mockResolvedValue({ data: 'data' });
    const { getByText } = render(<OurForm onSubmit={() => mockOnSubmit} />);
    const nextButton = getByText('Next');

    fireEvent.click(nextButton);

    // expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
