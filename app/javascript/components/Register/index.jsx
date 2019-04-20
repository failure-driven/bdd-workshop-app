import React from 'react';
import MainContainer from '../MainContainer';
import OurForm from '../OurForm';
import messageBus from '../../utils/messageBus';
import { createUserProfile } from '../API';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col, Row, Card, CardBody, CardHeader, CardTitle } from 'reactstrap';

const Register = ({ fetchProfile, history }) => {
  const onOurFormSubmit = OurFormData => {
    return createUserProfile(OurFormData)
      .then(({ data: { id } }) => {
        localStorage.setItem('player', JSON.stringify({ id: id }));
        messageBus.info('profile successfully created');
        fetchProfile(id).then(() => {
          history.push('/profile');
        });
      })
      .catch(res => {
        const messages = Object.keys(res.response.data.errors)
          .map(key => [key, res.response.data.errors[key]].join(': '))
          .join();
        messageBus.error(messages);
      });
  };

  return (
    <MainContainer dataTestId="register">
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Card>
            <CardHeader>
              <h1>Register</h1>
            </CardHeader>
            <CardBody>
              <CardTitle>
                <span>Register or </span>
                <Link to="/sign_in">sign in with an existing account</Link>
              </CardTitle>
              <OurForm onSubmit={onOurFormSubmit} step="handle" />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </MainContainer>
  );
};

Register.propTypes = {
  fetchProfile: PropTypes.func,
  history: PropTypes.object,
};

export default Register;
