import React from 'react';
import { Nav, NavItem, NavLink, Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <Navbar color="princess-pink" light>
      <NavbarBrand tag={Link} to="/" data-testid="landing-page-link">
        Game
      </NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/profile">
            Profile
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
