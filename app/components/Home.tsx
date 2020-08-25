import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';

export default function Home(): JSX.Element {
  return (
    <div>
      <h2>Home</h2>
      <hr />
      <Link to={routes.COUNTER}>
        <h3>Manage credentials</h3>
      </Link>
      <Link to={routes.SYNC}>
        <h3>Sync data</h3>
      </Link>
    </div>
  );
}
