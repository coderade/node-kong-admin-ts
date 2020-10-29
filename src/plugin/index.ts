'use strict';
import {Connector} from '../connector'

export class Plugin {
  connector: any;
  params: any;

  constructor(params: any) {
    this.params = params;
    this.connector = new Connector(params);
  }

  create(data: any) {
    const url = '/plugins';
    data = this.validate(data);
    return this.connector.execute('post', url, data, null);
  }

  createByRoute(routeId: any, data: any, cb: any) {
    const url = '/routes/' + routeId + '/plugins';
    data = this.validate(data);
    return this.connector.execute('post', url, data, null);
  }

  createByService(serviceId: any, data: any) {
    const url = '/services/' + serviceId + '/plugins';
    data = this.validate(data);
    return this.connector.execute('post', url, data, null);
  }

  createByConsumer(consumerId: any, data: any) {
    const url = '/consumers/' + consumerId + '/plugins';
    data = this.validate(data);
    return this.connector.execute('post', url, data, null);
  }

  get(pluginId: any) {
    const url = '/plugins/' + pluginId;
    return this.connector.execute('get', url, null, null);
  }


  getEnabledPlugins() {
    const url = '/plugins/enabled';
    return this.connector.execute('get', url, null, null);
  }

  getSchema(pluginName: any) {
    const url = '/plugins/schema/' + pluginName;
    return this.connector.execute('get', url, null, null);
  }

  list(offset: any) {
    const url = '/plugins';
    const queryString = offset ? {offset: offset} : null;
    return this.connector.execute('get', url, null, queryString);
  }

  listByRoute(routeId: any, offset: any) {
    const url = '/routes/' + routeId + '/plugins';
    const queryString = offset ? {offset: offset} : null;
    return this.connector.execute('get', url, null, queryString);
  }

  listByService(serviceId: any, offset: any, cb: any) {
    const url = '/services/' + serviceId + '/plugins';
    const queryString = offset ? {offset: offset} : null;
    return this.connector.execute('get', url, null, queryString);
  }

  listByConsumer(consumerId: any, offset: any) {
    const url = '/consumers/' + consumerId + '/plugins';
    const queryString = offset ? {offset: offset} : null;
    return this.connector.execute('get', url, null, queryString);
  }

  update(data: any) {
    const url = '/plugins/' + data.id;
    data = this.validate(data);
    return this.connector.execute('patch', url, data, null);
  }

  updateOrCreate(data: any) {
    const url = '/plugins/' + data.id;
    data = this.validate(data);
    return this.connector.execute('put', url, data, null);

  }

  delete(pluginId: any) {
    const url = '/plugins/' + pluginId;
    return this.connector.execute('delete', url, null, null);

  // @ts-expect-error ts-migrate(7008) FIXME: Member 'N' implicitly has an 'any' type.
  }N

  validate(data: any) {

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

  }
}

