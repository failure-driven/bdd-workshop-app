import React from 'react';
import { shallow } from 'enzyme';
import StepFormGroup from '.';

describe('StepFormGroup', () => {
  it('Renders a register form', () => {
    const wrapper = shallow(
      <StepFormGroup
        values={{}}
        step="email"
        label="Email label"
        type="email"
        placeholder="placeholder text"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
