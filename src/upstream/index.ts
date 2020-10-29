'use strict';
import {Connector} from '../connector'

export class Upstream {
  connector: any;
  params: any;
  constructor(params: any) {
    this.params = params;
    this.connector = new Connector(params);
  }

  create(data: any, cb: any) {
    this.connector.execute('post', '/upstreams', this.validate(data), null, cb);
  }

  get(upstreamNameOrId: any, cb: any) {
    this.connector.execute('get', '/upstreams/' + upstreamNameOrId, null, null, cb);
  }

  getByTarget(targetHostAndPortOrId: any, cb: any) {
    this.connector.execute('get', '/targets/' + targetHostAndPortOrId + '/upstream', null, null, cb);
  }

  health(upstreamNameOrId: any, cb: any) {
    this.connector.execute('get', '/upstreams/' + upstreamNameOrId + '/health', null, null, cb);
  }

  list(offset: any, cb: any) {
    this.connector.execute('get', '/upstreams', null, {offset: offset}, cb);
  }

  update(data: any, cb: any) {
    this.connector.execute('patch', '/upstreams/' + (data.id || data.name), this.validate(data), null, cb);
  }

  updateByTarget(targetHostAndPortOrId: any, data: any, cb: any) {
    this.connector.execute('patch', '/targets/' + targetHostAndPortOrId + '/upstream', this.validate(data), null, cb);
  }

  updateOrCreate(data: any, cb: any) {
    this.connector.execute('put', '/upstreams/' + (data.id || data.name), this.validate(data), null, cb);
  }

  updateOrCreateByTarget(targetHostAndPortOrId: any, data: any, cb: any) {
    this.connector.execute('put', '/targets/' + targetHostAndPortOrId + '/upstream', this.validate(data), null, cb);
  }

  delete(upstreamNameOrId: any, cb: any) {
    this.connector.execute('delete', '/upstreams/' + upstreamNameOrId, null, null, cb);
  }

  deleteByTarget(targetHostAndPortOrId: any, cb: any) {
    this.connector.execute('delete', '/targets/' + targetHostAndPortOrId + '/upstream', null, null, cb);
  }

  validate(data: any) {
    if (!data || !(data instanceof Object)) throw new Error('Data must be an Object!');
    return {
      'name': data.name,
      'hash_on': data.hash_on || 'none',
      'hash_fallback': data.hash_fallback || 'none',
      'hash_on_cookie_path': data.hash_on_cookie_path || '/',
      'slots': data.slots || 10000,
      'healthchecks': data.healthchecks,
      'tags': data.tags,
    };
  }
}