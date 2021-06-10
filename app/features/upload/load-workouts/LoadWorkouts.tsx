import React from 'react';
import { CredentialsProperties } from '../../../db/schemas/credentials';
import { Link } from 'react-router-dom';
import routes from '../../../constants/routes.json';
import { CredentialsStore } from '../../../db/stores/credentials';
import { GetWorkouts } from '../get-workouts/GetWorkouts';

const db = new CredentialsStore();
const providers = ['Peloton', 'Garmin'];

export function LoadWorkouts(): React.ReactElement {
  const [credentials, setCredentials] = React.useState<CredentialsProperties[]>(
    []
  );
  const [missingProviders, setMissingProviders] = React.useState<string[]>([]);

  React.useEffect(() => {
    db.getCredentialsByProviders(providers)
      .then((res) => {
        if (res) {
          setCredentials(res.map(({ properties }) => properties));
        } else {
          setMissingProviders([...providers]);
        }
      })
      .catch(() => setMissingProviders([...providers]));
  }, []);

  return missingProviders.length ? (
    <div className="alert alert-danger" role="alert">
      <div className="d-flex flex-column">
        <b>Your {missingProviders.join(', ')} accounts seem to be missing</b>
        <Link to={routes.COUNTER}>
          <a>Update them here</a>
        </Link>
      </div>
    </div>
  ) : (
    <GetWorkouts credentials={credentials} />
  );
}
