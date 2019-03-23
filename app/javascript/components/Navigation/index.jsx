import React from 'react';
import {
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
} from 'reactstrap';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <Navbar color="princess-pink" light expand="md">
      <NavbarBrand tag={Link} to="/" data-testid="landing-page-link">
        Game
      </NavbarBrand>
      <Collapse isOpen={true} navbar>
        <Nav navbar>
          <NavItem>
            <NavLink tag={Link} to="/about">
              About
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/profile">
              Profile
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Navigation;
