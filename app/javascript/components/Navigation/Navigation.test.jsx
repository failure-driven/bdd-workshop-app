import React from 'react';
import { shallow } from 'enzyme';
import Navigation from '.';

describe('Navigation', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Navigation />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
