import React from 'react';
import { shallow } from 'enzyme';
import Game from '.';

describe('Game', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Game />);
    expect(wrapper).toMatchSnapshot();
  });
});
