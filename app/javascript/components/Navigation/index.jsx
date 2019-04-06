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
import Avatar from '../Avatar'
import PropTypes from 'prop-types';

const Navigation = ({profile, loading}) => {
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
          {
            loading ? '' :
            profile ?
              <NavItem>
                <NavLink tag={Link} to="/profile">
                  <Avatar />
                  <span data-testid="placeholder-avatar"> {profile.handle}</span>
                </NavLink>
              </NavItem>
              :
              <NavItem>
                <NavLink tag={Link} to="/register">
                  Register
                </NavLink>
              </NavItem>
          }
        </Nav>
      </Collapse>
    </Navbar>
  );
};
Navigation.propTypes = {
  profile: PropTypes.object,
  loading: PropTypes.bool,
}
export default Navigation;
