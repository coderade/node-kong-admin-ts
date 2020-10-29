'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Connector'... Remove this comment to see the full error message
const Connector = require('../connector');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Consumer'.
class Consumer {
  connector: any;
  params: any;

  constructor(params: any) {

    this.params = params;
    this.connector = new Connector(params);

  }

  create(data: any) {
    const url = '/consumers';
    return this.connector.execute('post', url, this.validate(data), null);
  }

  get(usernameOrId: any) {
    const url = '/consumers/' + usernameOrId;
    return this.connector.execute('get', url, null, null);
  }

  getByPlugin(pluginId: any) {
    const url = '/plugins/' + pluginId + '/consumer';
    return this.connector.execute('get', url, null, null);
  }

  list(offset: any) {

    const url = '/routes';
    const queryString = offset ? {offset: offset} : null;
    return this.connector.execute('get', url, null, queryString);

  }

  update(data: any) {

    const url = '/consumers/' + (data.id || data.username);
    data = this.validate(data);

    return this.connector.execute('patch', url, data, null);

  }

  updateByPlugin(pluginId: any, data: any) {

    const url = '/plugins/' + pluginId + '/route';
    data = this.validate(data);

    return this.connector.execute('patch', url, data, null);

  }

  updateOrCreate(data: any) {

    const url = '/consumers/' + (data.id || data.name);
    data = this.validate(data);

    return this.connector.execute('put', url, data, null);

  }

  updateOrCreateByPlugin(pluginId: any, data: any) {

    const url = '/plugins/' + pluginId + '/consumer';
    data = this.validate(data);

    return this.connector.execute('put', url, data, null);

  }

  createKeyAuthCredentials(consumerIdOrUsername: any, key: any) {

    const url = '/consumers/' + consumerIdOrUsername + '/key-auth';
    const data = {key: key};

    return this.connector.execute('post', url, data, null);

  }

  listKeyAuthCredentials(consumerIdOrUsername: any) {

    const url = '/consumers/' + consumerIdOrUsername + '/key-auth';

    return this.connector.execute('get', url, null, null);

  }

  deleteKeyAuthCredentials(consumerIdOrUsername: any, keyId: any) {

    const url = `/consumers/${consumerIdOrUsername}/key-auth/${keyId}`;

    return this.connector.execute('delete', url, null, null, keyId);

  }

  delete(nameOrId: any, cb: any) {

    const url = '/consumers/' + nameOrId;

    return this.connector.execute('delete', url, null, null, cb);

  }

  validate(data: any) {

    if (!data || !(data instanceof Object)) {
      throw new Error('Data must be an Object!');
    }

    return {
      'username': data.username,
      'custom_id': data.custom_id,
      'tags': data.tags,
    };

  }
}


// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = Consumer;

