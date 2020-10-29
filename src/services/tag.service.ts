'use strict';
import {Connector} from '../connector'

export class Tag {
  connector: any;
  params: any;

  constructor(params: any) {
    this.params = params;
    this.connector = new Connector(params);
  }

  list(offset: any, cb: any) {

    this.connector.execute('get', '/tags', null, offset ? {offset: offset} : null, cb);

  }

  listByTags(tags: any, offset: any, cb: any) {

    this.connector.execute('get', '/tags/' + tags, null, offset ? {offset: offset} : null, cb);

  }
}

