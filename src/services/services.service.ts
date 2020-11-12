'use strict';
import {Connector} from '../connector'
import {ConnectorParams} from "../types";
import {DataValidator} from "../validators";
import {ServiceRequest, ServiceResponse, ServicesList} from "../types/service";

export class Service {
    connector: Connector;
    params: ConnectorParams;
    validator: DataValidator

    constructor(params: ConnectorParams) {
        this.params = params;
        this.connector = new Connector(params);
        this.validator = new DataValidator();
    }


    create(data: ServiceRequest): Promise<ServiceResponse> {
        const url = '/services';
        data = this.validator.validateService(data);
        return this.connector.execute('post', url, data, null);
    }

    get(id: string): Promise<ServiceResponse> {
        const url = `/services/${id}`;
        return this.connector.execute('get', url, null, null);

    }

    getByRoute(routeId: string): Promise<ServiceResponse> {
        const url = `/routes/${routeId}/service`;
        return this.connector.execute('get', url, null, null);
    }

    getByPlugin(pluginId: string): Promise<ServiceResponse> {
        const url = `/plugins/${pluginId}/service`;
        return this.connector.execute('get', url, null, null);

    }

    list(offset: string): Promise<ServicesList> {
        const queryString = offset ? {offset: offset} : null;
        return this.connector.execute('get', '/services', null, queryString);
    }

    update(data: ServiceRequest): Promise<ServiceResponse> {
        const url = `/services/${data.id || data.name}`;
        data = this.validator.validateService(data);
        return this.connector.execute('patch', url, data, null);

    }

    updateByRoute(routeNameOrId: string, data: ServiceRequest): Promise<ServiceResponse> {
        const url = `/routes/${routeNameOrId}/service`;
        data = this.validator.validateService(data);
        return this.connector.execute('patch', url, data, null);

    }

    updateByPlugin(pluginId: string, data: ServiceRequest): Promise<ServiceResponse> {
        const url = `/plugins/${pluginId}/service`;
        data = this.validator.validateService(data);
        return this.connector.execute('patch', url, data, null);

    }

    updateOrCreate(data: ServiceRequest): Promise<ServiceResponse> {
        const url = '/services/' + (data.id || data.name)
        data = this.validator.validateService(data);
        return this.connector.execute('put', url, data, null);

    }

    updateOrCreateByRoute(routeId: string, data: ServiceRequest): Promise<ServiceResponse> {
        const url = `/routes/${routeId}/service`
        data = this.validator.validateService(data);
        return this.connector.execute('put', url, data, null);
    }

    updateOrCreateByPlugin(pluginId: string, data: ServiceRequest): Promise<ServiceResponse> {
        const url = `/plugins/${pluginId}/service`
        data = this.validator.validateService(data);
        return this.connector.execute('put', url, data, null);
    }

    delete(nameOrId: string): Promise<void> {
        const url = `/services/${nameOrId}`;
        return this.connector.execute('delete', url, null, null);
    }

    deleteByRoute(routeNameOrId: string): Promise<void> {
        const url = `/routes/${routeNameOrId}/service`;
        return this.connector.execute('delete', url, null, null);
    }
}

