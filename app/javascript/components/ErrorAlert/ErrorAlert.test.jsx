import React from 'react';
import { shallow } from 'enzyme';
import ErrorAlert from '.';

describe('ErrorAlert', () => {
  it('renders correctly in loading state', () => {
    const wrapper = shallow(<ErrorAlert errorMessage="bad thing" />);
    expect(wrapper).toMatchSnapshot();
  });
});
