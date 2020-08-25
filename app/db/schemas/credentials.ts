import { Document } from './Document';

export type Credentials = CredentialsSchema & Document;

export type CredentialsSchema = {
  type: 'credentials';
  properties: CredentialsProperties;
};

export type CredentialsProperties = {
  provider: string;
  username: string;
  password: string;
};
