/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Alert, Button, Col, Row } from 'reactstrap';
import Description from './Description';
import styled from 'styled-components';
import FakeApi from './FakeApi';

// A flaky test as part of #BDDflakyChallenge
//    http://localhost:3000/flaky/number/3
//
// run using
//    rspec --tag flaky spec/BDD_flaky_challenge/flaky_number_3_spec.rb
//
// HINT: You may need to look at the test and the comonent behviour

const FlakyNumber3 = () => {
  // useShare is a hook taking care of the state of most things
  const { elements, message, shareAction, setElements, rerun } = useShare();

  // loadElement is calls the API and uses setElements to add the element
  // to the list of elements
  const loadElement = () => {
    // HINT: changing latency to something slower may give you an opportunity
    // to work out what is going on, try 300ms FakeApi({latency: 300})
    FakeApi({ latency: 30 })
      .get(elements.length)
      .then(({ data }) => {
        const newElement = ShareableElement({ ...data, action: shareAction });
        setElements([newElement, ...elements]);
      });
  };

  // the API gets called till all 9 elements have been loaded
  if (elements.length < 9) loadElement();

  // the component renders the Description, rerun controls, alert message
  // and list of elements
  return (
    <>
      <Description id="3" />
      <Flake3Controls rerun={rerun} />
      <Row className="mt-3">
        <Col>
          <ColHeight100>
            {message && <Alert color="primary">{message}</Alert>}
          </ColHeight100>
        </Col>
      </Row>
      <Row>
        <Col>{elements.map(element => element)}</Col>
      </Row>
    </>
  );
};

// Anything below here should NOT need to be touched to fix the flaky
const Flake3Controls = ({ rerun }) => (
  <Row>
    <Col>
      <Button onClick={rerun}>rerun</Button>
    </Col>
  </Row>
);

const useShare = () => {
  const [elements, setElements] = useState([]);
  const [message, setMessage] = useState();

  const shareAction = message => {
    setMessage(message);
  };

  const rerun = () => {
    setElements([]);
    setMessage(undefined);
  };

  return { elements, message, shareAction, setElements, rerun };
};

const ColHeight100 = styled.div`
  min-height: 50px;
  margin-bottom: 16px;
`;

const ShareableElement = ({ text, id, imgUrl, action }) => {
  const AvatarImg = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
  `;
  return (
    <Button
      onClick={() => action(`shared with ${text}`)}
      key={id}
      style={{
        width: '100px',
        minWidth: '100px',
        height: '100px',
        backgroundColor: 'red',
      }}
    >
      <AvatarImg src={imgUrl} alt={`image of ${text}`} />
      {text}
    </Button>
  );
};

export default FlakyNumber3;
