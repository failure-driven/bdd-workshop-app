import React from 'react';
import { shallow } from 'enzyme';
import Routes from '.';

describe('Routes', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Routes />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
