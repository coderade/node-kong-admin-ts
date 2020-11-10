'use strict';
import {Connector} from '../connector'
import {DataValidator} from '../validators'
import {ConnectorParams} from "../types";

export class Consumer {
    connector: Connector;
    params: ConnectorParams;
    validator: DataValidator

    constructor(params: ConnectorParams) {
        this.params = params;
        this.connector = new Connector(params);
        this.validator = new DataValidator();
    }

    create(data: any) {
        const url = '/consumers';
        data = this.validator.validate(data)
        return this.connector.execute('post', url, data, null);
    }

    get(usernameOrId: string) {
        const url = `/consumers/${usernameOrId}`;
        return this.connector.execute('get', url, null, null);
    }

    getByPlugin(pluginId: string) {
        const url = `/plugins/${pluginId}/consumer`;
        return this.connector.execute('get', url, null, null);
    }

    list(offset: string) {
        const url = '/routes';
        const queryString = offset ? {offset: offset} : null;
        return this.connector.execute('get', url, null, queryString);
    }

    update(data: any) {
        const url = `/consumers/${data.id || data.username}`;
        data = this.validator.validate(data)
        return this.connector.execute('patch', url, data, null);
    }

    updateByPlugin(pluginId: string, data: any) {
        const url = '/plugins/' + pluginId + '/route';
        data = this.validator.validate(data)
        return this.connector.execute('patch', url, data, null);
    }

    updateOrCreate(data: any) {
        const url = '/consumers/' + (data.id || data.name);
        data = this.validator.validate(data)
        return this.connector.execute('put', url, data, null);
    }

    updateOrCreateByPlugin(pluginId: string, data: any) {
        const url = '/plugins/' + pluginId + '/consumer';
        data = this.validator.validate(data)
        return this.connector.execute('put', url, data, null);
    }

    createKeyAuthCredentials(consumerId: string, keyAuthId: string) {
        const url = `/consumers/${consumerId}/key-auth`;
        const data = {key: keyAuthId};
        return this.connector.execute('post', url, data, null);
    }

    listKeyAuthCredentials(consumerId: string) {
        const url = `/consumers/${consumerId}/key-auth`;
        return this.connector.execute('get', url, null, null);
    }

    deleteKeyAuthCredentials(consumerId: string, key: string) {
        const url = `/consumers/${consumerId}/key-auth/${key}`;
        return this.connector.execute('delete', url, null, null);
    }

    delete(nameOrId: string): Promise<any> {
        const url = `/consumers/${nameOrId}`;
        return this.connector.execute('delete', url, null, null);
    }

}

