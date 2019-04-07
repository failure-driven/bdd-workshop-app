import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'reactstrap';
import ActionButton from '.';

describe('ActionButton', () => {
  it('Renders a primary submit button with children text', () => {
    const wrapper = shallow(<ActionButton>button text</ActionButton>);
    expect(wrapper).toMatchSnapshot();
    expect(
      wrapper
        .find(Button)
        .dive()
        .text()
    ).toEqual('button text');
  });

  it('Renders button NOT disabled by default', () => {
    const wrapper = shallow(<ActionButton>button text</ActionButton>);
    expect(wrapper.find(Button).prop('disabled')).toBeFalsy();
  });

  it('Renders button disabled if isSubmitting', () => {
    const wrapper = shallow(
      <ActionButton isSubmitting={true}>button text</ActionButton>
    );
    expect(wrapper.find(Button).prop('disabled')).toBeTruthy();
  });
});
