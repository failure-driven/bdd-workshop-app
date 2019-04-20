import React from 'react';
import { Spinner } from 'reactstrap';
import MainContainer from '../MainContainer';

const OurSpinner = () => (
  <MainContainer dataTestId="spinner">
    <Spinner />
  </MainContainer>
);

export default OurSpinner;
