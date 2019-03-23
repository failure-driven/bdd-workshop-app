import React from 'react';
import { Progress } from 'reactstrap';

const ProgressBar = () => (
  <>
    <div className="text-center" data-testid="profile-progress">
      50%
    </div>
    <Progress value={50} />
  </>
);

export default ProgressBar;
