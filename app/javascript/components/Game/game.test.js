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

  it('renders a <div>', () => {
    expect(wrapper.type()).toBe('div');
  });

  it('renders a div with message and one with version as children', () => {
    expect(wrapper.find('[data-test="message"]').prop('children')).toBe(
      'You are on React'
    );
    expect(wrapper.find('[data-test="react-version"]').prop('children')).toBe(
      '16.8.4'
    );
  });
});
