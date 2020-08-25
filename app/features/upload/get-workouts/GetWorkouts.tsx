import React from 'react';
import { CredentialsProperties } from '../../../db/schemas/credentials';
import Axios from 'axios';

type PelotonLoginRequestJson = {
  username_or_email: string;
  password: string;
  with_pubsub: boolean;
};

export type GetWorkoutsProps = {
  credentials: CredentialsProperties[];
};

export const GetWorkouts: React.FunctionComponent<GetWorkoutsProps> = ({
  credentials,
}) => {
  const [data, setData] = React.useState<any>();

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await Axios({
        method: 'post',
        url: 'https://api.onepeloton.ca/auth/login',
        data: {
          username_or_email: credentials[0].username,
          password: credentials[0].password,
          with_pubsub: false,
        },
      }).then(async (res) => {
        console.log('login response', res);
        await Axios({
          method: 'get',
          url:
            'https://api.onepeloton.ca/api/user/490a72ca546b467fa7542e0372bc8a49/workouts?joins=ride&limit=10&page=0',
        }).then((res) => console.log('get workouts response', res));

        return res;
      });

      setData(result.data);
    };

    fetchData().finally();
  }, []);

  return (
    <div>
      <pre style={{ width: '500px' }}>{JSON.stringify(data)}</pre>
    </div>
  );
};
