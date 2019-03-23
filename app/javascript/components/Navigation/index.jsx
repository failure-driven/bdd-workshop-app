import React, { useState } from 'react';
import {
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from 'reactstrap';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Navbar color="princess-pink" light expand="md">
      <NavbarBrand tag={Link} to="/" data-testid="landing-page-link">
        Game
      </NavbarBrand>
      <NavbarToggler onClick={toggleNavbar} className="mr-2" />
      <Collapse isOpen={!collapsed} navbar>
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
