import React from 'react';
import { Link } from 'react-router-dom';

const Experimental = () => {
  return (
    <ul>
      <li>
        <Link to="/experimental">Experimental</Link>
      </li>
      <li>
        <Link to="/experimental/ExProfile">ExProfile</Link>
      </li>
      <li>
        <Link to="/experimental/ExHookProfile">ExHookProfile</Link>
      </li>
    </ul>
  );
};

export default Experimental;
