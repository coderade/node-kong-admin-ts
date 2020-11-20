'use strict';
import {Connector} from '../connector'
import {DataValidator} from '../validators'
import {ConnectorParams, ConsumerList, ConsumerRequest, ConsumerResponse} from "../types";
import {KeyAuthList, KeyAuthResponse} from "../types/keyAuth";

export class Consumer {
    connector: Connector;
    params: ConnectorParams;
    validator: DataValidator

    constructor(params: ConnectorParams) {
        this.params = params;
        this.connector = new Connector(params);
        this.validator = new DataValidator();
    }

    create(data: ConsumerRequest): Promise<ConsumerResponse> {
        const url = '/consumers';
        data = this.validator.validate(data)
        return this.connector.execute('post', url, data, null);
    }

    get(usernameOrId: string): Promise<ConsumerResponse> {
        const url = `/consumers/${usernameOrId}`;
        return this.connector.execute('get', url, null, null);
    }

    getByPlugin(pluginId: string): Promise<ConsumerResponse> {
        const url = `/plugins/${pluginId}/consumer`;
        return this.connector.execute('get', url, null, null);
    }

    list(offset: string): Promise<ConsumerList> {
        const url = '/routes';
        const queryString = offset ? {offset: offset} : null;
        return this.connector.execute('get', url, null, queryString);
    }

    update(data: ConsumerRequest): Promise<ConsumerResponse> {
        const url = `/consumers/${data.custom_id || data.username}`;
        data = this.validator.validate(data)
        return this.connector.execute('patch', url, data, null);
    }

    updateByPlugin(pluginId: string, data: ConsumerRequest): Promise<ConsumerResponse> {
        const url = `/plugins/${pluginId}/route`;
        data = this.validator.validate(data)
        return this.connector.execute('patch', url, data, null);
    }

    updateOrCreate(data: ConsumerRequest): Promise<ConsumerResponse> {
        const url = `/consumers/${data.custom_id || data.username}`;
        data = this.validator.validate(data)
        return this.connector.execute('put', url, data, null);
    }

    updateOrCreateByPlugin(pluginId: string, data: ConsumerRequest): Promise<ConsumerResponse> {
        const url = `/plugins/${pluginId}/consumer`;
        data = this.validator.validate(data)
        return this.connector.execute('put', url, data, null);
    }

    createKeyAuthCredentials(consumerId: string, keyAuthId: string): Promise<KeyAuthResponse> {
        const url = `/consumers/${consumerId}/key-auth`;
        const data = {key: keyAuthId};
        return this.connector.execute('post', url, data, null);
    }

    listKeyAuthCredentials(consumerId: string): Promise<KeyAuthList> {
        const url = `/consumers/${consumerId}/key-auth`;
        return this.connector.execute('get', url, null, null);
    }

    deleteKeyAuthCredentials(consumerId: string, key: string): Promise<void> {
        const url = `/consumers/${consumerId}/key-auth/${key}`;
        return this.connector.execute('delete', url, null, null);
    }

    delete(nameOrId: string): Promise<void> {
        const url = `/consumers/${nameOrId}`;
        return this.connector.execute('delete', url, null, null);
    }

}

