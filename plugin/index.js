'use strict';

const Connector = require('../connector');

class Plugin {

  constructor(params) {
    this.params = params;
    this.connector = new Connector(params);
  }

  create(data, cb) {

    this.connector.execute('post', '/plugins', this.validate(data), null, cb);

  };

  createByRoute(routeId, data, cb) {

    this.connector.execute('post', '/routes/' + routeId + '/plugins', this.validate(data), null, cb);

  };

  createByService(serviceId, data, cb) {

    this.connector.execute('post', '/services/' + serviceId + '/plugins', this.validate(data), null, cb);

  };

  createByConsumer(consumerId, data, cb) {

    this.connector.execute('post', '/consumers/' + consumerId + '/plugins', this.validate(data), null, cb);

  };

  get(pluginId, cb) {

    this.connector.execute('get', '/plugins/' + pluginId, null, null, cb);

  };


  getEnabledPlugins(cb) {

    this.connector.execute('get', '/plugins/enabled', null, null, cb);

  };

  getSchema(pluginName, cb) {

    this.connector.execute('get', '/plugins/schema/' + pluginName, null, null, cb);

  };

  list(offset, cb) {

    this.connector.execute('get', '/plugins', null, offset ? {offset: offset} : null, cb);

  };

  listByRoute(routeId, offset, cb) {

    this.connector.execute('get', '/routes/' + routeId + '/plugins', null, offset ? {offset: offset} : null, cb);

  };

  listByService(serviceId, offset, cb) {

    this.connector.execute('get', '/services/' + serviceId + '/plugins', null, offset ? {offset: offset} : null, cb);

  };

  listByConsumer(consumerId, offset, cb) {

    this.connector.execute('get', '/consumers/' + consumerId + '/plugins', null, offset ? {offset: offset} : null, cb);

  };

  update(data, cb) {

    this.connector.execute('patch', '/plugins/' + data.id, this.validate(data), null, cb);

  };

  updateOrCreate(data, cb) {

    this.connector.execute('put', '/plugins/' + data.id, this.validate(data), null, cb);

  };

  delete(pluginId, cb) {

    this.connector.execute('delete', '/plugins/' + pluginId, null, null, cb);

  };

  validate(data) {

    if (!data || !(data instanceof Object)) throw new Error('Data must be an Object!');

    return {
      'name': data.name,
      'route': data.route,
      'service': data.service,
      'consumer': data.consumer,
      'config': data.config,
      'run_on': data.run_on || 'first',
      'protocols': data.protocols || ['http', 'https'],
      'enabled': data.enabled,
      'tags': data.tags,
    };

  };

}


module.exports = Plugin;

