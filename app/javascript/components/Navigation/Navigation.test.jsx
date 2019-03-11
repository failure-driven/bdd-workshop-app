import React from 'react';
import { shallow } from 'enzyme';
import Navigation from '.';
import { Nav, NavbarBrand, NavLink } from 'reactstrap';

describe('Navigation', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Navigation />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('url WITH `profile=true`', () => {
    beforeEach(() => {
      wrapper = shallow(<Navigation location="/someting?profile=true" />);
    });

    it('renders profile behind hidden url params', () => {
      const navLink = wrapper
        .find(Nav)
        .childAt(0)
        .childAt(0);
      expect(navLink.type()).toBe(NavLink);
      expect(navLink.prop('to')).toEqual('/profile?profile=true');
      expect(wrapper).toMatchSnapshot();
    });

    it('renders brand link with profile param', () => {
      const navbarBrand = wrapper.find(NavbarBrand);
      expect(navbarBrand.prop('to')).toEqual('/?profile=true');
    });
  });

  describe('url WITHOUT `profile=true`', () => {
    beforeEach(() => {
      wrapper = shallow(<Navigation location="/someting" />);
    });

    it('Does not render profile link', () => {
      const navLinks = wrapper.find(NavLink);
      expect(navLinks.length).toBe(0);
    });

    it('renders brand link WITHOUT profile param', () => {
      const navbarBrand = wrapper.find(NavbarBrand);
      expect(navbarBrand.prop('to')).toEqual('/');
    });
  });

  describe('url `/profile`', () => {
    beforeEach(() => {
      wrapper = shallow(<Navigation location="/profile" />);
    });

    it('renders profile behind hidden url params', () => {
      const navLink = wrapper
        .find(Nav)
        .childAt(0)
        .childAt(0);
      expect(navLink.type()).toBe(NavLink);
      expect(navLink.prop('to')).toEqual('/profile?profile=true');
    });

    it('renders brand link with profile param', () => {
      const navbarBrand = wrapper.find(NavbarBrand);
      expect(navbarBrand.prop('to')).toEqual('/?profile=true');
    });
  });
});
