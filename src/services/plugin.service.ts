'use strict';
import {Connector} from '../connector'
import {ConnectorParams} from "../types";
import {EnabledPlugins, PluginRequest, PluginResponse, PluginsList} from "../types/plugin";
import {DataValidator} from "../validators";

export class Plugin {
    connector: Connector;
    params: ConnectorParams;
    validator: DataValidator

    constructor(params: ConnectorParams) {
        this.params = params;
        this.connector = new Connector(params);
        this.validator = new DataValidator();
    }

    create(data: PluginRequest): Promise<PluginRequest> {
        const url = '/plugins';
        data = this.validator.validatePlugin(data)
        return this.connector.execute('post', url, data, null);
    }

    createByRoute(routeId: string, data: PluginRequest): Promise<PluginRequest> {
        const url = `/routes/${routeId}/plugins`;
        data = this.validator.validatePlugin(data)
        return this.connector.execute('post', url, data, null);
    }

    createByService(serviceId: string, data: PluginRequest): Promise<PluginRequest> {
        const url = `/services/${serviceId}/plugins`;
        data = this.validator.validatePlugin(data)
        return this.connector.execute('post', url, data, null);
    }

    createByConsumer(consumerId: string, data: PluginRequest): Promise<PluginRequest> {
        const url = `/consumers/${consumerId}/plugins`;
        data = this.validator.validatePlugin(data)
        return this.connector.execute('post', url, data, null);
    }

    get(pluginId: string): Promise<PluginRequest> {
        const url = '/plugins/' + pluginId;
        return this.connector.execute('get', url, null, null);
    }

    getEnabledPlugins(): Promise<EnabledPlugins> {
        const url = '/plugins/enabled';
        return this.connector.execute('get', url, null, null);
    }

    getSchema(pluginName: PluginRequest) {
        const url = `/plugins/schema/${pluginName}`;
        return this.connector.execute('get', url, null, null);
    }

    list(offset: string): Promise<PluginsList> {
        const url = '/plugins';
        const queryString = offset ? {offset: offset} : null;
        return this.connector.execute('get', url, null, queryString);
    }

    listByRoute(routeId: string, offset: string): Promise<PluginsList> {
        const url = `/routes/${routeId}/plugins`;
        const queryString = offset ? {offset: offset} : null;
        return this.connector.execute('get', url, null, queryString);
    }

    listByService(serviceId: string, offset: string): Promise<PluginsList> {
        const url = `/services/${serviceId}/plugins`;
        const queryString = offset ? {offset: offset} : null;
        return this.connector.execute('get', url, null, queryString);
    }

    listByConsumer(consumerId: string, offset: string): Promise<PluginsList> {
        const url = `/consumers/${consumerId}/plugins`;
        const queryString = offset ? {offset: offset} : null;
        return this.connector.execute('get', url, null, queryString);
    }

    update(data: PluginRequest) : Promise<PluginResponse> {
        const url = `/plugins/${data.id}`;
        data = this.validator.validatePlugin(data)
        return this.connector.execute('patch', url, data, null);
    }

    updateOrCreate(data: PluginRequest) : Promise<PluginResponse> {
        const url = `/plugins/${data.id}`;
        data = this.validator.validatePlugin(data)
        return this.connector.execute('put', url, data, null);
    }

    delete(pluginId: string) : Promise<void>{
        const url = `/plugins/${pluginId}`;
        return this.connector.execute('delete', url, null, null);


    }
}

