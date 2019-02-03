import React from 'react';
import { shallow } from 'enzyme';
import Game from './game';

describe('Game', () => {
  it('renders a <div>', () => {
    const wrapper = shallow(<Game />);
    expect(wrapper.type()).toBe('div');
    expect(wrapper.prop('children')).toBe('16.7.0');
  });
});
