import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  Collapse,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';

const ExperimentalNav = () => {
  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div>
      <Navbar color="faded" light expand="md">
        <NavbarBrand tag={Link} to="/experimental" className="mr-auto">
          Experimental
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink tag={Link} to="/experimental/ExProfile">
                ExProfile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/experimental/ExHookProfile">
                ExHookProfile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/experimental/WhenThenSteps">
                WhenThenSteps
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default ExperimentalNav;
