'use strict';

const Connector = require('../connector');

class Plugin {

  constructor(params) {
    this.params = params;
    this.connector = new Connector(params);
  }

  create(data) {
    const url = '/plugins';
    data = this.validate(data);
    return this.connector.execute('post', url, data, null);
  };

  createByRoute(routeId, data, cb) {
    const url = '/routes/' + routeId + '/plugins';
    data = this.validate(data);
    return this.connector.execute('post', url, data, null);
  };

  createByService(serviceId, data) {
    const url = '/services/' + serviceId + '/plugins';
    data = this.validate(data);
    return this.connector.execute('post', url, data, null);
  };

  createByConsumer(consumerId, data) {
    const url = '/consumers/' + consumerId + '/plugins';
    data = this.validate(data);
    return this.connector.execute('post', url, data, null);
  };

  get(pluginId) {
    const url = '/plugins/' + pluginId;
    return this.connector.execute('get', url, null, null);
  };


  getEnabledPlugins() {
    const url = '/plugins/enabled';
    return this.connector.execute('get', url, null, null);
  };

  getSchema(pluginName) {
    const url = '/plugins/schema/' + pluginName;
    return this.connector.execute('get', url, null, null);
  };

  list(offset) {
    const url = '/plugins';
    const queryString = offset ? {offset: offset} : null;
    return this.connector.execute('get', url, null, queryString);
  };

  listByRoute(routeId, offset) {
    const url = '/routes/' + routeId + '/plugins';
    const queryString = offset ? {offset: offset} : null;
    return this.connector.execute('get', url, null, queryString);
  };

  listByService(serviceId, offset, cb) {
    const url = '/services/' + serviceId + '/plugins';
    const queryString = offset ? {offset: offset} : null;
    return this.connector.execute('get', url, null, queryString);
  };

  listByConsumer(consumerId, offset) {
    const url = '/consumers/' + consumerId + '/plugins';
    const queryString = offset ? {offset: offset} : null;
    return this.connector.execute('get', url, null, queryString);
  };

  update(data) {
    const url = '/plugins/' + data.id;
    data = this.validate(data);
    return this.connector.execute('patch', url, data, null);
  };

  updateOrCreate(data) {
    const url = '/plugins/' + data.id;
    data = this.validate(data);
    return this.connector.execute('put', url, data, null);

  };

  delete(pluginId) {
    const url = '/plugins/' + pluginId;
    return this.connector.execute('delete', url, null, null);

  };N

  validate(data) {

    if (!data || !(data instanceof Object)) {
      throw new Error('Data must be an Object!');
    }

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

