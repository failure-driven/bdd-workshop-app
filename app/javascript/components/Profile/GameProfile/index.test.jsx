import React from 'react';
import { shallow } from 'enzyme';
import GameProfile from '.';

describe('GameProfile', () => {
  it('Renders an incomplete profile with a complete my profile button', () => {
    const wrapper = shallow(<GameProfile profile={{ percentComplete: 0 }} />);
    expect(
      wrapper
        .find('Button')
        .children()
        .text()
    ).toEqual('Complete my profile');
    expect(wrapper).toMatchInlineSnapshot(`
<Fragment>
  <Button
    className="float-right"
    color="primary"
    data-testid="actions"
    tag={[Function]}
    to="/profile"
  >
    Complete my profile
  </Button>
</Fragment>
`);
  });

  it('Renders a complete profile', () => {
    const wrapper = shallow(<GameProfile profile={{ percentComplete: 100 }} />);
    expect(wrapper).toMatchInlineSnapshot(`
<Fragment>
  <p>
    Your profile is complete!
  </p>
</Fragment>
`);
  });
});
