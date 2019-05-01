import React from 'react';
import { shallow } from 'enzyme';
import RegisterForm from '.';

const elementsWithProp = (wrapper, element, prop) =>
  wrapper.find(element).map(e => e.prop(prop));

describe('RegisterForm', () => {
  describe('Render a step in registration process', () => {
    it('Renders handle for the handle step', () => {
      const wrapper = shallow(<RegisterForm step="handle" />);
      expect(elementsWithProp(wrapper, 'StepFormGroup', 'label')).toEqual([
        'Handle',
      ]);
    });

    it('Renders name for the name step', () => {
      const wrapper = shallow(<RegisterForm step="name" />);
      expect(elementsWithProp(wrapper, 'StepFormGroup', 'label')).toEqual([
        'Name',
      ]);
    });

    it('Renders email for the email step', () => {
      const wrapper = shallow(<RegisterForm step="email" />);
      expect(elementsWithProp(wrapper, 'StepFormGroup', 'label')).toEqual([
        'Email',
      ]);
    });

    it('Renders birthday for the birthday step', () => {
      const wrapper = shallow(<RegisterForm step="birthday" />);
      expect(elementsWithProp(wrapper, 'StepFormGroup', 'label')).toEqual([
        'Birthday',
      ]);
    });

    it('Renders avatar for the avatar step', () => {
      const wrapper = shallow(<RegisterForm step="avatarUrl" />);
      expect(elementsWithProp(wrapper, 'StepFormGroup', 'label')).toEqual([
        'Avatar',
      ]);
    });
  });

  describe('Render edit view', () => {
    it('Renders email, handle and avatar', () => {
      const wrapper = shallow(<RegisterForm />);
      expect(elementsWithProp(wrapper, 'StepFormGroup', 'label')).toEqual([
        'Handle',
        'Name',
        'Email',
        'Avatar',
      ]);
      expect(wrapper).toMatchSnapshot();
    });
  });

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
