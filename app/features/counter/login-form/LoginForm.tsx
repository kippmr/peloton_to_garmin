import React from 'react';
import styles from '../Counter.css';
import { Input } from '../../../components/input/Input';
import { savePassword } from '../counterSlice';
import { Credentials } from '../../../db/schemas/credentials';

export type LoginFormProps = {
  brandName: string;
};

export const LoginForm: React.FunctionComponent<LoginFormProps> = ({
  brandName,
}) => {
  const [buttonText, setButtonText] = React.useState<Credentials>();
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  return (
    <div className={'card ' + styles.base_card_sm}>
      <h3 className={'card-header'}>{brandName} login</h3>
      <div className={'card-body'}>
        <form>
          <Input
            label={'Username'}
            type={'text'}
            placeholder={`Enter your ${brandName} username`}
            onChange={(text) => setUsername(() => text)}
          />
          <Input
            label={'Password'}
            type={'password'}
            placeholder={`Enter your ${brandName} password`}
            onChange={(text) => setPassword(() => text)}
          />
          <button
            className={'btn btn-primary'}
            type="submit"
            onClick={() =>
              username && password
                ? savePassword(username, password, brandName).then((res) =>
                    setButtonText(() => res)
                  )
                : null
            }
          >
            Save password
          </button>

          <pre>{JSON.stringify(buttonText)}</pre>
        </form>
      </div>
    </div>
  );
};
