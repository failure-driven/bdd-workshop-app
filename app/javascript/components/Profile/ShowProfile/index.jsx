import React from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import Avatar from '../../Avatar';

const ShowProfile = ({ profile }) => {
  return (
    <>
      <Avatar profile={profile} />
      <Row>
        <Col>
          <dl>
            <dt>handle</dt>
            <dd data-testid="details-handle">{profile.handle}</dd>
            <dt>email</dt>
            <dd data-testid="details-email">{profile.email}</dd>
          </dl>
        </Col>
      </Row>
    </>
  );
};
ShowProfile.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.string.isRequired,
    handle: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default ShowProfile;
