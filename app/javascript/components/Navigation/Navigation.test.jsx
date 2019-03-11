import React from 'react';
import { shallow } from 'enzyme';
import Navigation from '.';
import { Nav, NavLink } from 'reactstrap';

describe('Navigation', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Navigation />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('url with `profile=true`', () => {
    it('renders profile behind hidden url params', () => {
      // eslint-disable-next-line no-global-assign
      window = Object.create(window);
      const url = 'http://dummy.com/?profile=true';
      Object.defineProperty(window, 'location', {
        value: {
          href: url,
        },
      });

      wrapper = shallow(<Navigation />);
      const navLink = wrapper
        .find(Nav)
        .childAt(0)
        .childAt(0);
      expect(navLink.type()).toBe(NavLink);
      expect(navLink.prop('href')).toEqual('/profile');
      expect(wrapper).toMatchSnapshot();
    });
  });
});
