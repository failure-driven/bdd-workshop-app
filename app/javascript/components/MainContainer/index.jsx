import React from 'react';
import PropTypes from 'prop-types';

const MainContainer = ({ children }) => <main className="m-5">{children}</main>;
MainContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default MainContainer;
