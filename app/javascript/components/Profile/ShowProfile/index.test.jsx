import React from 'react';
import { shallow } from 'enzyme';
import ShowProfile from '.';

describe('ShowProfile', () => {
  it('Displays avatar, handle and email', () => {
    const wrapper = shallow(
      <ShowProfile
        profile={{
          id: 'the-id',
          handle: 'the-handle',
          email: 'princess@email.comn',
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
