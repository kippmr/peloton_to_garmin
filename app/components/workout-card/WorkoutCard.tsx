import React from 'react';
import styles from '../../features/counter/Counter.css';
import { PelotonWorkout } from '../../features/external-api/peloton/peloton-workout-list/PelotonWorkoutList';
import useConvertPelotonToTcx from '../../features/upload/peloton-workout-to-tcx/useConvertPelotonToTcx';
import Axios from 'axios';
import { PelotonPerformaceData } from '../../features/external-api/peloton/peloton-performance-data/PelotonPerformaceData';
import useWorkoutUpload from '../../features/upload/upload-workout/useWorkoutUpload';

export type WorkoutCardProps = { workout: PelotonWorkout };

const WorkoutCard: React.FunctionComponent<WorkoutCardProps> = ({
  workout,
}) => {
  const onClick = async () => {
    const workoutResponse = await Axios.get<PelotonPerformaceData>(
      `https://api.onepeloton.ca/api/workout/${workout.id}/performance_graph?every_n=1`
    );

    const tcxString = useConvertPelotonToTcx(
      workoutResponse.data,
      new Date(workout.device_time_created_at * 1000)
    );

    useWorkoutUpload(tcxString);
  };

  return (
    <div className={'card ' + styles.base_card_lg}>
      <h3 className={'card-header'}>
        {workout.fitness_discipline === 'cycling' ? '🚲' : '💪'}{' '}
        {workout.ride.title} at{' '}
        {new Date(workout.created_at * 1000).toLocaleString()}
      </h3>
      <div className={'card-body'}>
        <div className="row g-0 position-relative">
          <div className="col-md-3 mb-md-0 p-md-1">
            <img src={workout.ride.image_url} className="w-100" alt="" />
          </div>
          <div className="col-md-9">
            <p>{JSON.stringify(workout.id)}</p>
            <button
              className="btn btn-primary stretched-link"
              onClick={onClick}
            >
              Go somewhere
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
