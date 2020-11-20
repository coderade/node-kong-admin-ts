'use strict';
import {Connector} from '../connector'
import {ConnectorParams, RouteList, RouteRequest, RouteResponse} from "../types";
import {DataValidator} from "../validators";

export class Route {
    connector: Connector;
    params: ConnectorParams;
    validator: DataValidator

    constructor(params: ConnectorParams) {
        this.params = params;
        this.connector = new Connector(params);
        this.validator = new DataValidator();
    }

    create(data: RouteRequest): Promise<RouteResponse> {
        data = this.validator.validateRouteRequest(data);
        return this.connector.execute('post', '/routes', data, null);
    }

    createByService(serviceNameOrId: string, data: RouteRequest): Promise<RouteResponse> {
        const url = `/services/${serviceNameOrId}/routes`;
        data = this.validator.validateRouteRequest(data);
        return this.connector.execute('post', url, data, null);
    }

    get(nameOrId: string): Promise<RouteResponse> {
        const url = `/routes/${nameOrId}`;
        return this.connector.execute('get', url, null, null);
    }

    getByPlugin(pluginId: string): Promise<RouteResponse> {
        const url = `/plugins/${pluginId}/route`;
        return this.connector.execute('get', url, null, null);
    }

    list(offset: string): Promise<RouteList> {
        const queryString = offset ? {offset: offset} : null;
        return this.connector.execute('get', '/routes', null, queryString);
    }

    listByService(serviceNameOrId: string, offset: string): Promise<RouteList> {
        const url = `/services/${serviceNameOrId}/routes`;
        const queryString = offset ? {offset: offset} : null;
        return this.connector.execute('get', url, null, queryString);
    }

    update(data: RouteRequest): Promise<RouteResponse> {
        const url = `/routes/${data.id || data.name}`;
        data = this.validator.validateRouteRequest(data);
        return this.connector.execute('patch', url, data, null);
    }

    updateByPlugin(pluginId: string, data: RouteRequest): Promise<RouteResponse> {
        const url = `/plugins/${pluginId}/route`;
        data = this.validator.validateRouteRequest(data);
        return this.connector.execute('patch', url, data, null);
    }

    updateOrCreate(data: RouteRequest): Promise<RouteResponse> {
        const url = `/routes/${data.id || data.name}`;
        data = this.validator.validateRouteRequest(data);
        return this.connector.execute('put', url, data, null);
    }

    updateOrCreateByPlugin(pluginId: string, data: RouteRequest): Promise<RouteResponse> {
        const url = '/plugins/' + pluginId + '/route';
        data = this.validator.validateRouteRequest(data);
        return this.connector.execute('put', url, data, null);
    }

    delete(nameOrId: string): Promise<void> {
        const url = '/routes/' + nameOrId;
        return this.connector.execute('delete', url, null, null);
    }

}

