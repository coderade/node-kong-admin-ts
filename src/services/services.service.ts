'use strict';
import {Connector} from '../connector'

export class Service {
    connector: any;
    params: any;

    constructor(params: any) {
        this.params = params;
        this.connector = new Connector(params);

    }

    create(data: any, cb: any) {

        this.connector.execute('post', '/services', this.validate(data), null, cb);

    }

    get(nameOrId: any, cb: any) {

        this.connector.execute('get', '/services/' + nameOrId, null, null, cb);

    }

    getByRoute(routeNameOrId: any, cb: any) {

        this.connector.execute('get', '/routes/' + routeNameOrId + '/service', null, null, cb);

    }

    getByPlugin(pluginId: any, cb: any) {

        this.connector.execute('get', '/plugins/' + pluginId + '/service', null, null, cb);

    }

    list(offset: any, cb: any) {

        this.connector.execute('get', '/services', null, offset ? {offset: offset} : null, cb);

    }

    update(data: any, cb: any) {

        this.connector.execute('patch', '/services/' + (data.id || data.name), this.validate(data), null, cb);

    }

    updateByRoute(routeNameOrId: any, data: any, cb: any) {

        this.connector.execute('patch', '/routes/' + routeNameOrId + '/service', this.validate(data), null, cb);

    }

    updateByPlugin(pluginId: any, data: any, cb: any) {

        this.connector.execute('patch', '/plugins/' + pluginId + '/service', this.validate(data), null, cb);

    }

    updateOrCreate(data: any, cb: any) {

        this.connector.execute('put', '/services/' + (data.id || data.name), this.validate(data), null, cb);

    }

    updateOrCreateByRoute(routeNameOrId: any, data: any, cb: any) {

        this.connector.execute('put', '/routes/' + routeNameOrId + '/service', this.validate(data), null, cb);

    }

    updateOrCreateByPlugin(pluginId: any, data: any, cb: any) {

        this.connector.execute('put', '/plugins/' + pluginId + '/service', this.validate(data), null, cb);

    }

    delete(nameOrId: any, cb: any) {

        this.connector.execute('delete', '/services/' + nameOrId, null, null, cb);

    }

    deleteByRoute(routeNameOrId: any, cb: any) {

        this.connector.execute('delete', '/routes/' + routeNameOrId + '/service', null, null, cb);

    }

    validate(data: any) {

        if (!data || !(data instanceof Object)) throw new Error('Data must be an Object!');

        return {
            name: data.name,
            retries: data.retries || 5,
            protocol: data.protocol || 'http',
            host: data.host,
            port: data.port || 80,
            path: data.path,
            connect_timeout: data.connect_timeout || 60000,
            write_timeout: data.write_timeout || 60000,
            read_timeout: data.read_timeout || 60000,
            tags: data.tags,
            url: data.url,
        };

    }
}

