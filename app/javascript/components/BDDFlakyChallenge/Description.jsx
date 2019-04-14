import React from 'react';

const DescriptionData = {
  '3': {
    number: 3,
    requirement:
      'Share something with "Selena" by clicking her avatar when it loads. If successfull you will see a success message "shared with Selena"',
    hint: 'You may need to look at the test and the component behviour.',
  },
};

// eslint-disable-next-line react/prop-types
const Description = ({ id }) => {
  const { number, requirement, hint } = DescriptionData[id];
  return (
    <>
      <h1>Flaky Number {number}</h1>
      <p>{requirement}</p>
      <p>
        A flaky test as part of
        <a
          href="https://twitter.com/search?q=%23BDDflakyChallenge"
          alt="#BDDflakyChallenge"
        >
          {' #BDDflakyChallenge '}
        </a>
        run using
      </p>
      <blockquote className="blockquote pl-5">
        <pre>
          rspec --tag flaky spec/BDD_flaky_challenge/flaky_number_{number}
          _spec.rb
        </pre>
      </blockquote>
      <p>
        <strong>HINT:</strong> {hint}
      </p>
      <blockquote className="blockquote pl-5">
        <pre>
          app/javascript/components/BDDFlakyChallenge/FlakyNumber{number}.jsx
        </pre>
      </blockquote>
    </>
  );
};

export { DescriptionData };
export default Description;
