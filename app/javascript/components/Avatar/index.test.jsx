import React from 'react';
import {shallow} from 'enzyme';
import Avatar from '.';

jest.mock('../API');

describe('Avatar', () => {
  it('renders an avatar', () => {
    const wrapper = shallow(<Avatar/>);
    expect(wrapper).toMatchSnapshot()
  })
});