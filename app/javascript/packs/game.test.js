import React from 'react';
import { configure, shallow } from 'enzyme';
import Game from './game';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Game', () => {
  it('renders a <div>', () => {
    const wrapper = shallow(<Game />);
    expect(wrapper.type()).toBe('div');
    expect(wrapper.prop('children')).toBe('16.7.0');
  });
});
