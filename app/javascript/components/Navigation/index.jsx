import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

const Navigation = () => (
  <Navbar color="princess-pink" light>
    <NavbarBrand href="/" data-test-id="landing-page-link">
      Game
    </NavbarBrand>
  </Navbar>
);

export default Navigation;
