'use strict';

const CONNECTOR = require('../connector');

class Consumer {

  constructor(params) {

    this.params = params;
    this.connector = new CONNECTOR(params);

  }

  create(data, cb) {

    this.connector.execute('post', '/consumers', this.validate(data), null, cb);

  };

  get(usernameOrId, cb) {

    this.connector.execute('get', '/consumers/' + usernameOrId, null, null, cb);

  };

  getByPlugin(pluginId, cb) {

    this.connector.execute('get', '/plugins/' + pluginId + '/consumer', null, null, cb);

  };

  list(offset, cb) {

    this.connector.execute('get', '/routes', null, offset ? {offset: offset} : null, cb);

  };

  update(data, cb) {

    this.connector.execute('patch', '/consumers/' + (data.id || data.username), this.validate(data), null, cb);

  };

  updateByPlugin(pluginId, data, cb) {

    this.connector.execute('patch', '/plugins/' + pluginId + '/route', this.validate(data), null, cb);

  };

  updateOrCreate(data, cb) {

    this.connector.execute('put', '/consumers/' + (data.id || data.name), this.validate(data), null, cb);

  };

  updateOrCreateByPlugin(pluginId, data, cb) {

    this.connector.execute('put', '/plugins/' + pluginId + '/consumer', this.validate(data), null, cb);

  };

  createKeyAuthCredentials(consumerIdOrUsername, key, cb) {

    this.connector.execute('post', '/consumers/' + consumerIdOrUsername + '/key-auth', {key: key}, null, cb);

  };

  listKeyAuthCredentials(consumerIdOrUsername, cb) {

    this.connector.execute('get', '/consumers/' + consumerIdOrUsername + '/key-auth', null, null, cb);

  };

  deleteKeyAuthCredentials(consumerIdOrUsername, keyId, cb) {

    this.connector.execute('delete', '/consumers/' + consumerIdOrUsername + '/key-auth/' + keyId, null, null, cb);

  };

  delete(nameOrId, cb) {

    this.connector.execute('delete', '/consumers/' + nameOrId, null, null, cb);

  };

  validate(data) {

    if (!data || !(data instanceof Object)) throw new Error('Data must be an Object!');

    return {
      'username': data.username,
      'custom_id': data.custom_id,
      'tags': data.tags,
    };

  };

}


module.exports = Consumer;

