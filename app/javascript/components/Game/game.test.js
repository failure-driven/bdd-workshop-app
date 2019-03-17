import React from 'react';
import { shallow } from 'enzyme';
import Game from '.';

describe('Game', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Game />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});