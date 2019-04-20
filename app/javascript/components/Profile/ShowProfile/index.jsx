import React from 'react';
import {  Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import Avatar from '../../Avatar';
import ShowProfileActions from './ShowProfileActions'

const ShowProfile = ({ profile, editOnClick }) => {
  return (
    <>
      <Avatar profile={profile} />
      <Row>
        <Col>
          <dl>
            <dt>handle</dt>
            <dd data-testid="details-handle">{profile.handle}</dd>
            <dt>name</dt>
            <dd data-testid="details-name">{profile.name}</dd>
            <dt>email</dt>
            <dd data-testid="details-email">{profile.email}</dd>
            <dt>avatar</dt>
            <dd data-testid="details-avatarUrl">{profile.avatarUrl}</dd>
          </dl>
        </Col>
      </Row>
    <ShowProfileActions editOnClick={editOnClick} />
    </>
  );
};
ShowProfile.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.string.isRequired,
    handle: PropTypes.string,
    email: PropTypes.string,
  }),
  editOnClick: PropTypes.func,
};

export default ShowProfile;
