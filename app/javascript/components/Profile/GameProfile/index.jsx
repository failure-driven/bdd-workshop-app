import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AvatarImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;
const HandleText = styled.span`
  font-size: 40px;
  font-weight: 700;
`;

const GameProfile = ({ profile }) => {
  const { avatarUrl, handle } = profile;
  return (
    <>
      {profile.percentComplete === 100 ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <AvatarImg
              data-testid={`avatar-${handle}`}
              src={avatarUrl}
              alt={`avatar for ${handle}`}
            />
            <i
              style={{ color: 'gold', fontSize: '80px' }}
              className="fa fa-star"
              aria-hidden="true"
            />
            <HandleText>{handle}</HandleText>
          </div>
          <p>Your profile is complete!</p>
        </>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <i className="fa fa-user" aria-hidden="true" />
            <span>{handle}</span>
          </div>
          <Button
            data-testid="actions"
            tag={Link}
            to="/profile"
            className="float-right"
            color="primary"
          >
            Complete my profile
          </Button>
        </>
      )}
    </>
  );
};

GameProfile.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default GameProfile;
