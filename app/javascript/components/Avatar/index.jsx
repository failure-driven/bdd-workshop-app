import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AvatarImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const Avatar = ({ profile: { avatarUrl, handle } }) => {
  if (avatarUrl)
    return <AvatarImg src={avatarUrl} alt={`avatar for ${handle}`} />;
  return (
    <i
      className="fa fa-user"
      aria-hidden="true"
      alt="placeholder-avatar"
      data-testid="details-avatar"
    />
  );
};
Avatar.propTypes = {
  profile: PropTypes.shape({
    avatarUrl: PropTypes.string,
    handle: PropTypes.string,
  }),
};

export default Avatar;
