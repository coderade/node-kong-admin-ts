'use strict';

const CONNECTOR = require('../connector');

class Target {
  constructor(params) {
    this.params = params;
    this.connector = new CONNECTOR(params);
  }

  create(data, cb) {
    this.connector.execute('post', '/upstreams/' + (data.upstream || data.target) + '/targets', this.validate(data), null, cb);
  };

  list(upstreamHostAndPortOrId, offset, cb) {
    this.connector.execute('get', '/upstreams/' + upstreamHostAndPortOrId + '/targets', null, offset ? {offset: offset} : null, cb);
  };

  listAll(upstreamNameOrId, cb) {
    this.connector.execute('get', '/upstreams/' + upstreamNameOrId + '/targets/all', null, null, cb);
  };

  delete(upstreamNameOrId, targetHostAndPortOrId, cb) {
    this.connector.execute('delete', '/upstreams/' + upstreamNameOrId + '/targets/' + targetHostAndPortOrId, null, null, cb);
  };

  setHealthy(upstreamNameOrId, targetHostAndPortOrId, cb) {
    this.connector.execute('post', '/upstreams/' + upstreamNameOrId + '/targets/' + targetHostAndPortOrId + '/healthy', {}, null, cb);
  };

  setUnhealthy(upstreamNameOrId, targetHostAndPortOrId, cb) {
    this.connector.execute('post', '/upstreams/' + upstreamNameOrId + '/targets/' + targetHostAndPortOrId + '/unhealthy', {}, null, cb);
  };

  validate(data) {
    if (!data || !(data instanceof Object)) throw new Error('Data must be an Object!');
    return {'upstream': {'id': data.upstream}, 'target': data.target, 'weight': data.weight, 'tags': data.tags};
  };


}


module.exports = Target;

