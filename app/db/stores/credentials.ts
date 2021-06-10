import Datastore from 'nedb-promises/index';
import { Credentials, CredentialsSchema } from '../schemas/credentials';
import { remote } from 'electron';

export class CredentialsStore {
  private dbInstance: Datastore;

  constructor() {
    // const dbPath = `${process.cwd()}/credentials.db`;
    // this.db = Datastore.create({
    //   filename: dbPath,
    //   autoload: true,
    //   timestampData: true,
    // });
    this.dbInstance = remote.getGlobal('db');
  }

  public async upsert(query: any, updateQuery: any): Promise<number> {
    return await this.dbInstance.update<CredentialsSchema>(query, updateQuery, {
      upsert: true,
    });
  }

  public async findOne(query: any): Promise<Credentials> {
    return await this.dbInstance.findOne(query);
  }

  public async getCredentialsByProvider(
    provider: string
  ): Promise<Credentials> {
    return await this.dbInstance.findOne({
      type: 'credentials',
      'properties.provider': provider,
    });
  }

  public async getCredentialsByProviders(
    providers: string[]
  ): Promise<Credentials[]> {
    let credentials: Credentials[] = [];
    for (let provider of providers) {
      credentials.push(
        await this.dbInstance.findOne({
          type: 'credentials',
          'properties.provider': provider,
        })
      );
    }
    return credentials;
  }
}
