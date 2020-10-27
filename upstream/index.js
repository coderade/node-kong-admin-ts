'use strict';

const CONNECTOR = require('../connector');

class Upstream {
  constructor(params) {
    this.params = params;
    this.connector = new CONNECTOR(params);
  }

  create(data, cb) {
    this.connector.execute('post', '/upstreams', this.validate(data), null, cb);
  };

  get(upstreamNameOrId, cb) {
    this.connector.execute('get', '/upstreams/' + upstreamNameOrId, null, null, cb);
  };

  getByTarget(targetHostAndPortOrId, cb) {
    this.connector.execute('get', '/targets/' + targetHostAndPortOrId + '/upstream', null, null, cb);
  };

  health(upstreamNameOrId, cb) {
    this.connector.execute('get', '/upstreams/' + upstreamNameOrId + '/health', null, null, cb);
  };

  list(offset, cb) {
    this.connector.execute('get', '/upstreams', null, {offset: offset}, cb);
  };

  update(data, cb) {
    this.connector.execute('patch', '/upstreams/' + (data.id || data.name), this.validate(data), null, cb);
  };

  updateByTarget(targetHostAndPortOrId, data, cb) {
    this.connector.execute('patch', '/targets/' + targetHostAndPortOrId + '/upstream', this.validate(data), null, cb);
  };

  updateOrCreate(data, cb) {
    this.connector.execute('put', '/upstreams/' + (data.id || data.name), this.validate(data), null, cb);
  };

  updateOrCreateByTarget(targetHostAndPortOrId, data, cb) {
    this.connector.execute('put', '/targets/' + targetHostAndPortOrId + '/upstream', this.validate(data), null, cb);
  };

  delete(upstreamNameOrId, cb) {
    this.connector.execute('delete', '/upstreams/' + upstreamNameOrId, null, null, cb);
  };

  deleteByTarget(targetHostAndPortOrId, cb) {
    this.connector.execute('delete', '/targets/' + targetHostAndPortOrId + '/upstream', null, null, cb);
  };

  validate(data) {
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
  };

}


module.exports = Upstream;