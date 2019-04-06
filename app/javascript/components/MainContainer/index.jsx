import React from 'react';
import PropTypes from 'prop-types';

const MainContainer = ({ children, dataTestId }) => (
  <main className="m-5" data-testid={dataTestId}>
    {children}
  </main>
);
MainContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  dataTestId: PropTypes.string,
};

export default MainContainer;
