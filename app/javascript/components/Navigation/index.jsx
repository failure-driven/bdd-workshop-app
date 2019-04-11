import React, { useState } from 'react';
import {
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar';
import PropTypes from 'prop-types';

const Navigation = ({ profile, loading }) => {
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
        <Nav className="rightNav ml-auto" navbar>
          {loading ? (
            ''
          ) : profile ? (
            <UncontrolledDropdown nav inNavbar data-testid="details">
              <DropdownToggle nav caret data-testid="summary">
                <Avatar />
                <span> {profile.handle}</span>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem
                  tag={Link}
                  to="/profile"
                  data-testid="profie-link"
                >
                  Profile
                </DropdownItem>
                <DropdownItem tag={Link} to="/sign_out">
                  Sign out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          ) : (
            <>
              <NavItem>
                <NavLink tag={Link} to="/sign_in" data-testid="sign-in-link">
                  Sign in
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/register" data-testid="register-link">
                  Register
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

Navigation.propTypes = {
  profile: PropTypes.object,
  loading: PropTypes.bool,
};

export default Navigation;
