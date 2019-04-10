import React from 'react';
import MainContainer from '../MainContainer';
import OurForm from '../OurForm';
import messageBus from '../../utils/messageBus';
import { loginAsUser } from '../API';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import {
  Col,
  Row,
  Card,
  CardBody,
  CardHeader,
} from 'reactstrap';

const SignIn = ({ profile, fetchProfile, history }) => {
  const onOurFormSubmit = OurFormData => {
    return loginAsUser(OurFormData)
      .then(({ data: { id, handle, email } }) => {
        localStorage.setItem(
          'player',
          JSON.stringify({ id: id, handle: handle })
        );
        messageBus.info('signed in successfully');
        fetchProfile();
        if (id && handle && email) {
          history.push('/game');
        } else {
          history.push('/profile');
        }
      })
      .catch(res => {
        const errors = res.response.data.errors;
        const messages = Array.isArray(errors)
          ? errors.map(e => e.detail).join()
          : Object.keys(errors)
              .map(key => [key, errors[key]].join(': '))
              .join();
        messageBus.error(messages);
      });
  };

  if (profile) return <Redirect to="/profile" />;
  return (
    <MainContainer dataTestId="sign-in">
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Card>
            <CardHeader>
              <h1>Sign In</h1>
            </CardHeader>
            <CardBody>
              <OurForm
                profile={{ handle: null, email: null }}
                onSubmit={onOurFormSubmit}
                step="handle"
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </MainContainer>
  );
};

SignIn.propTypes = {
  fetchProfile: PropTypes.func,
  profile: PropTypes.object,
  history: PropTypes.object,
};

export default SignIn;
