'use strict';
import {Connector} from '../connector'

export class Config {
  connector: any;
  params: any;

  constructor(params: any) {
    this.params = params;
    this.connector = new Connector(params);
  }

  dbLess = (filePath: any) => {

    return this.connector.execute('postFile', '/config', filePath, null);

  };
}

