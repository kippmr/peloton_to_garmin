import React from 'react';
import { LoadWorkouts } from './load-workouts/LoadWorkouts';

export default function SyncData(): React.ReactElement {
  return (
    <div>
      <h2>Sync Data</h2>
      <hr />
      <LoadWorkouts />
    </div>
  );
}
