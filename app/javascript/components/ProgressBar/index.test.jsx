import React from 'react';
import { shallow } from 'enzyme';
import ProgressBar from '.';

describe('ProgressBar', () => {
  it('Displays the percentComplete', () => {
    const wrapper = shallow(<ProgressBar percentComplete={33} />);
    expect(wrapper).toMatchSnapshot();
  });
});
