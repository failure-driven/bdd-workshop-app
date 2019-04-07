import React from 'react';
import { Progress } from 'reactstrap';
import PropTypes from 'prop-types';

const ProgressBar = ({ progressValue }) => {
  return (
    <>
      <div className="text-center" data-testid="profile-progress">
        {`${progressValue}%`}
      </div>
      <Progress value={progressValue} />
    </>
  );
};
ProgressBar.propTypes = {
  progressValue: PropTypes.number.isRequired,
};

export default ProgressBar;
