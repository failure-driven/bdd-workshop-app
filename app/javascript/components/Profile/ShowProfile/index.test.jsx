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
          email: 'princess@email.com',
        }}
      />
    );
    expect(wrapper.find('dl')).toMatchInlineSnapshot(`
<dl>
  <dt>
    handle
  </dt>
  <dd
    data-testid="details-handle"
  >
    the-handle
  </dd>
  <dt>
    email
  </dt>
  <dd
    data-testid="details-email"
  >
    princess@email.com
  </dd>
</dl>
`);
  });
});
