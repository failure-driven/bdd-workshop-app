import React from 'react';
import { Nav, NavItem, NavLink, Navbar, NavbarBrand } from 'reactstrap';

const Navigation = () => {
  const showProfileFeature = /\?.*profile=true.*$/.exec(window.location.href);

  return (
    <Navbar color="princess-pink" light>
      <NavbarBrand href="/" data-test-id="landing-page-link">
        Game
      </NavbarBrand>
      {showProfileFeature ? (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/profile">Profile</NavLink>
          </NavItem>
        </Nav>
      ) : (
        ''
      )}
    </Navbar>
  );
};

export default Navigation;
