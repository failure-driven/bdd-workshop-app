import React from 'react';
import MainContainer from '../MainContainer';

const About = () => (
  <MainContainer dataTestId="about">
    <h1>Game App</h1>
    <p data-testid="about-content">
      A demo app of BDD built for RailsConf 2019
    </p>
  </MainContainer>
);

export default About;
