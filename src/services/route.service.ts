'use strict';
import {Connector} from '../connector'

export class Route {
  connector: any;
  params: any;

  constructor(params: any) {
    this.params = params;
    this.connector = new Connector(params);
  }

  create(data: any, cb: any) {

    this.connector.execute('post', '/routes', this.validate(data), null, cb);

  }

  createByService(serviceNameOrId: any, data: any, cb: any) {

    this.connector.execute('post', '/services/' + serviceNameOrId + '/routes', this.validate(data), null, cb);

  }

  get(nameOrId: any, cb: any) {

    this.connector.execute('get', '/routes/' + nameOrId, null, null, cb);

  }

  getByPlugin(pluginId: any, cb: any) {

    this.connector.execute('get', '/plugins/' + pluginId + '/route', null, null, cb);

  }

  list(offset: any, cb: any) {

    this.connector.execute('get', '/routes', null, offset ? {offset: offset} : null, cb);

  }

  listByService(serviceNameOrId: any, offset: any, cb: any) {

    this.connector.execute('get', '/services/' + serviceNameOrId + '/routes', null, offset ? {offset: offset} : null, cb);

  }

  update(data: any, cb: any) {

    this.connector.execute('patch', '/routes/' + (data.id || data.name), this.validate(data), null, cb);

  }

  updateByPlugin(pluginId: any, data: any, cb: any) {

    this.connector.execute('patch', '/plugins/' + pluginId + '/route', this.validate(data), null, cb);

  }

  updateOrCreate(data: any, cb: any) {

    this.connector.execute('put', '/routes/' + (data.id || data.name), this.validate(data), null, cb);

  }

  updateOrCreateByPlugin(pluginId: any, data: any, cb: any) {

    this.connector.execute('put', '/plugins/' + pluginId + '/route', this.validate(data), null, cb);

  }

  delete(nameOrId: any, cb: any) {

    this.connector.execute('delete', '/routes/' + nameOrId, null, null, cb);

  }

  validate(data: any) {

    if (!data || !(data instanceof Object)) throw new Error('Data must be an Object!');

    return {
      'name': data.name,
      'protocols': data.protocols || ['http', 'https'],
      'methods': data.methods,
      'hosts': data.hosts,
      'paths': data.paths,
      'regex_priority': data.regex_priority || 0,
      'strip_path': data.strip_path,
      'preserve_host': data.preserve_host,
      'tags': data.tags,
      'snis': data.snis,
      'sources': data.sources,
      'destinations': data.destinations,
      'service': data.service,
    };

  }
}

