import React from 'react';
import { Progress } from 'reactstrap';
import PropTypes from 'prop-types';

const ProgressBar = ({ percentComplete }) => {
  return (
    <>
      <div className="text-center" data-testid="profile-progress">
        {`${percentComplete}%`}
      </div>
      <Progress value={percentComplete} />
    </>
  );
};
ProgressBar.propTypes = {
  percentComplete: PropTypes.number.isRequired,
};

export default ProgressBar;
