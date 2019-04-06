import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({handle}) => {
  return (
    <>
    <i className="fa fa-user" aria-hidden="true" alt="placeholder-avatar"></i>
    {handle ? (<span>{handle}</span>) : ''}
    </>
  )
};
Avatar.propTypes = {
  handle: PropTypes.string,
}

export default Avatar;
