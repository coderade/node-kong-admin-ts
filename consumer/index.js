'use strict';

const Connector = require('../connector');

class Consumer {

  constructor(params) {

    this.params = params;
    this.connector = new Connector(params);

  }

  create(data) {
    const url = '/consumers';
    return this.connector.execute('post', url, this.validate(data), null);
  };

  get(usernameOrId) {
    const url = '/consumers/' + usernameOrId;
    return this.connector.execute('get', url, null, null);
  };

  getByPlugin(pluginId) {
    const url = '/plugins/' + pluginId + '/consumer';
    return this.connector.execute('get', url, null, null);
  };

  list(offset) {

    const url = '/routes';
    const queryString = offset ? {offset: offset} : null;
    return this.connector.execute('get', url, null, queryString);

  };

  update(data) {

    const url = '/consumers/' + (data.id || data.username);
    data = this.validate(data);

    return this.connector.execute('patch', url, data, null);

  };

  updateByPlugin(pluginId, data) {

    const url = '/plugins/' + pluginId + '/route';
    data = this.validate(data);

    return this.connector.execute('patch', url, data, null);

  };

  updateOrCreate(data) {

    const url = '/consumers/' + (data.id || data.name);
    data = this.validate(data);

    return this.connector.execute('put', url, data, null);

  };

  updateOrCreateByPlugin(pluginId, data) {

    const url = '/plugins/' + pluginId + '/consumer';
    data = this.validate(data);

    return this.connector.execute('put', url, data, null);

  };

  createKeyAuthCredentials(consumerIdOrUsername, key) {

    const url = '/consumers/' + consumerIdOrUsername + '/key-auth';
    const data = {key: key};

    return this.connector.execute('post', url, data, null);

  };

  listKeyAuthCredentials(consumerIdOrUsername) {

    const url = '/consumers/' + consumerIdOrUsername + '/key-auth';

    return this.connector.execute('get', url, null, null);

  };

  deleteKeyAuthCredentials(consumerIdOrUsername, keyId) {

    const url = '/consumers/' + consumerIdOrUsername + '/key-auth/' + keyId;

    return this.connector.execute('delete', url, null, null);

  };

  delete(nameOrId, cb) {

    const url = '/consumers/' + nameOrId;

    return this.connector.execute('delete', url, null, null, cb);

  };

  validate(data) {

    if (!data || !(data instanceof Object)) {
      throw new Error('Data must be an Object!');
    }

    return {
      'username': data.username,
      'custom_id': data.custom_id,
      'tags': data.tags,
    };

  };

}


module.exports = Consumer;

