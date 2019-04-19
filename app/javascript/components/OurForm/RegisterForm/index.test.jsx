import React from 'react';
import { shallow } from 'enzyme';
import RegisterForm from '.';

describe('RegisterForm', () => {
  describe('Render a step in registration process', () => {
    it('Renders email for the email step', () => {
      const wrapper = shallow(<RegisterForm step="email" />);
      expect(wrapper.find({ label: 'Handle' }).length).toBe(0);
      expect(wrapper.find({ label: 'Email' }).length).toBe(1);
      expect(wrapper.find({ label: 'Avatar' }).length).toBe(0);
    });

    it('Renders name for the name step', () => {
      const wrapper = shallow(<RegisterForm step="name" />);
      expect(wrapper.find({ label: 'Handle' }).length).toBe(0);
      expect(wrapper.find({ label: 'Name' }).length).toBe(1);
      expect(wrapper.find({ label: 'Email' }).length).toBe(0);
      expect(wrapper.find({ label: 'Avatar' }).length).toBe(0);
    });

    it('Renders handle for the handle step', () => {
      const wrapper = shallow(<RegisterForm step="handle" />);
      expect(wrapper.find({ label: 'Handle' }).length).toBe(1);
      expect(wrapper.find({ label: 'Email' }).length).toBe(0);
      expect(wrapper.find({ label: 'Avatar' }).length).toBe(0);
    });

    it('Renders avatar for the avatar step', () => {
      const wrapper = shallow(<RegisterForm step="avatar" />);
      expect(wrapper.find({ label: 'Handle' }).length).toBe(0);
      expect(wrapper.find({ label: 'Email' }).length).toBe(0);
      expect(wrapper.find({ label: 'Avatar' }).length).toBe(1);
    });
  });

  describe('Render edit view', () => {
    it('Renders email, handle and avatar', () => {
      const wrapper = shallow(<RegisterForm />);
      // TODO change to find all and list labels
      expect(wrapper.find({ label: 'Handle' }).length).toBe(1);
      expect(wrapper.find({ label: 'Name' }).length).toBe(1);
      expect(wrapper.find({ label: 'Email' }).length).toBe(1);
      expect(wrapper.find({ label: 'Avatar' }).length).toBe(1);
      expect(wrapper).toMatchSnapshot();
    });
  })

  it('Renders an Action button with text submit', () => {
    const wrapper = shallow(<RegisterForm />);
    expect(wrapper.find('ActionButton').prop('children')).toEqual('Submit');
  });

  it('Submit calls handleSubmit', () => {
    const mockHandleSubmit = jest.fn();
    const wrapper = shallow(<RegisterForm handleSubmit={mockHandleSubmit} />);
    wrapper.simulate('submit');
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });
});
