import React from 'react';
import { CredentialsProperties } from '../../../db/schemas/credentials';
import Axios from 'axios';
import { PelotonLoginResponse } from '../../external-api/peloton/login/PelotonLoginResponse';
import { PelotonWorkoutList } from '../../external-api/peloton/peloton-workout-list/PelotonWorkoutList';
import '../../counter/Counter.css';
import styles from '../../counter/Counter.css';
import { PelotonWorkoutToTcx } from '../peloton-workout-to-tcx/PelotonWorkoutToTcx';
import { remote } from 'electron';
import { PelotonPerformaceData } from '../../external-api/peloton/peloton-performance-data/PelotonPerformaceData';

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
        // required to persist the cookies
        // const session = window.require('electron').remote.session;
        const session = remote.session;

        const loginResponse = await Axios.post<PelotonLoginResponse>(
          'https://api.onepeloton.ca/auth/login',
          {
            username_or_email: credentials[0].username,
            password: credentials[0].password,
            with_pubsub: false,
          }
        );
        console.log('login response', loginResponse.data.user_id);
        await session.defaultSession.cookies.set({
          url: 'https://api.onepeloton.ca/',
          name: 'peloton_session_id',
          value: loginResponse.data.session_id,
        });

        const listResponse = await Axios.get<PelotonWorkoutList>(
          `https://api.onepeloton.ca/api/user/${loginResponse.data.user_id}/workouts?joins=ride&limit=100&page=0`
        );
        console.log('get response', listResponse);

        const workoutResponse = await Axios.get<PelotonPerformaceData>(
          `https://api.onepeloton.ca/api/workout/fc6e5b494fc04043a76cd230aa4486b0/performance_graph?every_n=1` // ${listResponse.data.data[0].id}/performance_graph?every_n=5`
        );
        console.log('workout response', workoutResponse.data);
        console.log(
          'convert',
          PelotonWorkoutToTcx(
            workoutResponse.data,
            new Date(listResponse.data.data[0].device_time_created_at * 1000)
          )
        );

        // const response = await Axios({
        //   method: 'post',
        //   url: 'https://api.onepeloton.ca/auth/login',
        //   data: {
        //     username_or_email: credentials[0].username,
        //     password: credentials[0].password,
        //     with_pubsub: false,
        //   },
        // }).then(async (res: AxiosResponse<PelotonLoginResponse>) => {
        //   console.log('login response', res.data.user_id);
        //   await session.defaultSession.cookies.set({
        //     url: 'https://api.onepeloton.ca/',
        //     name: 'peloton_session_id',
        //     value: res.data.session_id,
        //   });
        //   return await Axios({
        //     method: 'get',
        //     url: `https://api.onepeloton.ca/api/user/${res.data.user_id}/workouts?joins=ride&limit=100&page=0`,
        //   }).then((res: AxiosResponse<PelotonWorkoutList>) => {
        //     console.log('get workouts response', res);
        //     await Axios({
        //       method: 'get',
        //       url: `https://api.onepeloton.ca/api/workout/__ID_HERE__/performance_graph?every_n=5`,
        //     });
        //     console.log(PelotonWorkoutToTcx('asd'));
        //     return res;
        //   });
        // });

        setData(listResponse.data);
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
                <div className="col-md-3 mb-md-0 p-md-1">
                  <img src={workout.ride.image_url} className="w-100" alt="" />
                </div>
                <div className="col-md-9">
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
