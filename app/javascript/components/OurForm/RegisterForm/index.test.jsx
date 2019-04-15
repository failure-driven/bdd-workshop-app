import React from 'react';
import { shallow } from 'enzyme';
import RegisterForm from '.';

describe('RegisterForm', () => {
  it('Renders a register form', () => {
    const wrapper = shallow(<RegisterForm />);
    expect(wrapper).toMatchInlineSnapshot(`
<Form
  tag="form"
>
  <StepFormGroup
    label="Handle"
    placeholder="input a custom handle"
    step="handle"
  />
  <StepFormGroup
    label="Email"
    placeholder="input your email"
    step="email"
    type="email"
  />
  <ActionButton>
    Submit
  </ActionButton>
</Form>
`);
  });

  it('Renders an Action button with text submit', () => {
    const wrapper = shallow(<RegisterForm />);
    expect(wrapper.find('ActionButton').prop('children')).toEqual('Submit');
  });

  it('Renders the handle with label and placeholder', () => {
    const wrapper = shallow(<RegisterForm step="handle" />);
    expect(wrapper.find('StepFormGroup')).toMatchInlineSnapshot(`
<StepFormGroup
  label="Handle"
  placeholder="input a custom handle"
  step="handle"
/>
`);
  });

  it('Renders the email with label and placeholder', () => {
    const wrapper = shallow(<RegisterForm step="email" />);
    expect(wrapper.find('StepFormGroup')).toMatchInlineSnapshot(`
<StepFormGroup
  label="Email"
  placeholder="input your email"
  step="email"
  type="email"
/>
`);
  });

  it('Submit calls handleSubmti', () => {
    const mockHandleSubmit = jest.fn();
    const wrapper = shallow(<RegisterForm handleSubmit={mockHandleSubmit} />);
    wrapper.simulate('submit');
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });
});
