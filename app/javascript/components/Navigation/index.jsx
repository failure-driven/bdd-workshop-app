import React from 'react';
import { Nav, NavItem, NavLink, Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navigation = ({ location }) => {
  const showProfileFeature = () => {
    const href = location || window.location.href;
    return /(?:.*\/profile|\?.*profile=true.*$)/.exec(href);
  };

  const linkWithProfileFeature = link =>
    `${link}${showProfileFeature() ? '?profile=true' : ''}`;

  return (
    <Navbar color="princess-pink" light>
      <NavbarBrand
        tag={Link}
        to={linkWithProfileFeature('/')}
        data-test-id="landing-page-link"
      >
        Game
      </NavbarBrand>
      {showProfileFeature() ? (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to={linkWithProfileFeature('/profile')}>
              Profile
            </NavLink>
          </NavItem>
        </Nav>
      ) : (
        ''
      )}
    </Navbar>
  );
};

Navigation.propTypes = {
  location: PropTypes.string,
};
// Navigation.propType
export default Navigation;
