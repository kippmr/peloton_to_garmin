import React from 'react';
import { CredentialsProperties } from '../../../db/schemas/credentials';
import Axios, { AxiosResponse } from 'axios';
import { PelotonLoginResponse } from '../../external-api/peloton/login/PelotonLoginResponse';
import { PelotonWorkoutList } from '../../external-api/peloton/peloton-workout-list/PelotonWorkoutList';
import '../../counter/Counter.css';
import styles from '../../counter/Counter.css';

export type GetWorkoutsProps = {
  credentials: CredentialsProperties[];
};

export const GetWorkouts: React.FunctionComponent<GetWorkoutsProps> = ({
  credentials,
}) => {
  const [data, setData] = React.useState<PelotonWorkoutList>();

  React.useEffect(() => {
    const pelotonCredential = credentials.find(
      (credential) => credential.provider == 'Peloton'
    );

    if (pelotonCredential) {
      const fetchData = async () => {
        const response = await Axios({
          method: 'post',
          url: 'https://api.onepeloton.ca/auth/login',
          data: {
            username_or_email: credentials[0].username,
            password: credentials[0].password,
            with_pubsub: false,
          },
        }).then(async (res: AxiosResponse<PelotonLoginResponse>) => {
          console.log('login response', res.data.user_id);
          return await Axios({
            method: 'get',
            url: `https://api.onepeloton.ca/api/user/${res.data.user_id}/workouts?joins=ride&limit=100&page=0`,
          }).then((res: AxiosResponse<PelotonWorkoutList>) => {
            console.log('get workouts response', res);
            return res;
          });
        });

        setData(response.data);
      };

      fetchData().finally();
    }
  }, [credentials]);

  return (
    <div>
      <pre style={{ width: '800px' }}>{JSON.stringify(data)}</pre>
      {data?.data.map((workout) => {
        return (
          <div className={'card ' + styles.base_card_lg}>
            <h3 className={'card-header'}>
              {workout.fitness_discipline === 'cycling' ? '🚲' : '💪'}{' '}
              {workout.ride.title} at{' '}
              {new Date(workout.created_at * 1000).toLocaleString()}
            </h3>
            <div className={'card-body'}>
              <div className="row g-0 position-relative">
                <div className="col-md-3 mb-md-0 p-md-4">
                  <img src={workout.ride.image_url} className="w-100" alt="" />
                </div>
                <div className="col-md-9 p-4 pl-md-0">
                  <p>{JSON.stringify(workout.id)}</p>
                  <button
                    className="btn btn-primary stretched-link"
                    onClick={() => console.log('printed')}
                  >
                    Go somewhere
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
