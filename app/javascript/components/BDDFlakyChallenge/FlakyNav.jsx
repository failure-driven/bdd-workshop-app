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
import { DescriptionData } from './Description';

const FlakyNav = () => {
  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div>
      <Navbar color="faded" light expand="md">
        <NavbarBrand tag={Link} to="/flaky" className="mr-auto">
          Flaky
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            {Object.keys(DescriptionData).map(id => {
              const { number } = DescriptionData[id];
              return (
                <NavItem key={id}>
                  <NavLink tag={Link} to={`/flaky/number/${number}`}>
                    Flaky {number}
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default FlakyNav;
