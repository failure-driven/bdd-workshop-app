import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ShowProfileActions = ({ editOnClick }) => (
  <div data-testid="actions">
    <Button tag={Link} to="/game" color="secondary">
      Play the game
    </Button>
    <Button color="primary" onClick={editOnClick} className="float-right">
      Edit
    </Button>
  </div>
);

ShowProfileActions.propTypes = {
  editOnClick: PropTypes.func,
};
export default ShowProfileActions;
