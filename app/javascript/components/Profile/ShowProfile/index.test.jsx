import React from 'react';
import { shallow } from 'enzyme';
import ShowProfile from '.';
import { Col } from 'reactstrap';

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
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Col)).toMatchInlineSnapshot(`
<Col
  tag="div"
  widths={
    Array [
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
    ]
  }
>
  <dl>
    <dt>
      handle
    </dt>
    <dd
      data-testid="details-handle"
    >
      the-handle
    </dd>
  </dl>
  <dl>
    <dt>
      email
    </dt>
    <dd
      data-testid="details-email"
    >
      princess@email.com
    </dd>
  </dl>
</Col>
`);
  });
});
