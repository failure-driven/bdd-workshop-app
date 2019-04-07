import React from 'react';
import { shallow } from 'enzyme';
import ProgressBar from '.';

describe('ProgressBar', () => {
  it('Displays the progressValue', () => {
    const wrapper = shallow(<ProgressBar progressValue={33} />);
    expect(wrapper).toMatchSnapshot();
  });
});
