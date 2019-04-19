import React from 'react';
import {shallow} from 'enzyme';
import ShowProfile from '.';

describe('ShowProfile', () => {
  it('Displays avatar, name, handle and email', () => {
    const wrapper = shallow(
      <ShowProfile
        profile={{
          id: 'the-id',
          handle: 'the-handle',
          name: 'the-name',
          email: 'princess@email.com',
        }}
      />
    );

    const descriptions = {}
    const values = wrapper.find('dd').map((e) => e.text());
    wrapper.find('dt').map((e, i) => {descriptions[e.text()] = values[i]})

    expect(descriptions).toEqual({
      'avatar': '',
      'name': 'the-name',
      'email': 'princess@email.com',
      'handle': 'the-handle',
    });
  });
});
