import React from 'react';
import { shallow } from 'enzyme';
import Profile from '.';

describe('Profile', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Profile />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
