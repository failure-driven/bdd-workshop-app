import React from 'react';
import { shallow } from 'enzyme';
import MainContainer from '.';
import 'jest-dom/extend-expect';

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

  it('renders with optional data-testid', () => {
    const wrapper = shallow(
      <MainContainer dataTestId="my-test-id">
        <div />
      </MainContainer>
    );
    expect(wrapper.prop('data-testid')).toEqual('my-test-id');
  });
});
