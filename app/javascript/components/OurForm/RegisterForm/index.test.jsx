import React from 'react';
import { shallow } from 'enzyme';
import RegisterForm from '.';
import { EmailStepFormGroup, HandleStepFormGroup } from '../RegisterForm';

describe('RegisterForm', () => {
  it('Renders a register form', () => {
    const wrapper = shallow(<RegisterForm />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Renders an Action button with text submit', () => {
    const wrapper = shallow(<RegisterForm />);
    expect(wrapper.find('ActionButton').prop('children')).toEqual('Submit');
  });

  it('Renders the handle step form if step is handle', () => {
    const wrapper = shallow(<RegisterForm step="handle" />);
    expect(
      wrapper.contains(<HandleStepFormGroup step="handle" />)
    ).toBeTruthy();
  });

  it('Renders the email step form if step is email', () => {
    const wrapper = shallow(<RegisterForm step="email" />);
    expect(wrapper.contains(<EmailStepFormGroup step="email" />)).toBeTruthy();
  });

  it('Submit calls handleSubmti', () => {
    const mockHandleSubmit = jest.fn();
    const wrapper = shallow(<RegisterForm handleSubmit={mockHandleSubmit} />);
    wrapper.simulate('submit');
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });
});
