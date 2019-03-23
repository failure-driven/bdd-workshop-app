import React from 'react';
import { shallow } from 'enzyme';
import MainContainer from '.';

describe('MainContainer', () => {
  it('renders correctly for 1 child', () => {
    const wrapper = shallow(
      <MainContainer>
        <span>single child</span>
      </MainContainer>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly for many children', () => {
    const wrapper = shallow(
      <MainContainer>
        <div>one</div>
        <div>two</div>
      </MainContainer>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
