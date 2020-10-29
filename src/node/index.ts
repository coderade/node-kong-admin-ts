'use strict';
import {Connector} from '../connector'

export class Node {
  connector: any;
  params: any;
  constructor(params: any) {
    this.params = params;
    this.connector = new Connector(params);
  }

  get() {
    return this.connector.execute('get', '/', null, null);
  }

  status() {
    return this.connector.execute('get', '/status', null, null);
  }
}

