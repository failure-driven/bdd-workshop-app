import React from 'react';
import { shallow } from 'enzyme';
import WarGamesIntro from '.';

describe('WarGamesIntro', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<WarGamesIntro />);
    expect(wrapper).toMatchSnapshot();
  });
});
