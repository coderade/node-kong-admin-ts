'use strict';
import {Connector} from '../connector'
import {DataValidator} from "../validators";
import {UpstreamRequest, UpstreamResponse, ConnectorParams} from "../types";

export class Upstream {
    connector: Connector;
    params: ConnectorParams;
    validator: DataValidator

    constructor(params: ConnectorParams) {
        this.params = params;
        this.connector = new Connector(params);
        this.validator = new DataValidator();
    }

    create(data: UpstreamRequest): Promise<UpstreamResponse> {
        data = this.validator.validateUpstream(data);
        return this.connector.execute('post', '/upstreams', data, null);
    }

    get(upstreamId: string): Promise<UpstreamResponse> {
        const url = `/upstreams/${upstreamId}`;
        return this.connector.execute('get', url, null, null);
    }

    getByTarget(targetId: string) {
        const url = `/targets/${targetId}/upstream`
        return this.connector.execute('get', url, null, null);
    }

    health(upstreamId: string) {
        const url = `/upstreams/${upstreamId}/health`;
        return this.connector.execute('get', url, null, null);
    }

    list(offset: string) {
        const queryString = {offset: offset};
        return this.connector.execute('get', '/upstreams', null, queryString);
    }

    update(data: UpstreamRequest) {
        const upstreamData = this.validator.validateUpstream(data);
        const url = `/upstreams/${upstreamData.id || upstreamData.name}`;
        return this.connector.execute('patch', url, upstreamData, null);
    }

    updateByTarget(targetId: string, data: UpstreamRequest) {
        const upstreamData = this.validator.validateUpstream(data);
        const url = `/targets/${targetId}/upstream`;
        return this.connector.execute('patch', url, upstreamData, null);
    }

    updateOrCreate(data: UpstreamRequest) {
        const upstreamData = this.validator.validateUpstream(data);
        const url = `/upstreams/${upstreamData.id || upstreamData.name}`;
        return this.connector.execute('put', url, upstreamData, null);
    }

    updateOrCreateByTarget(targetId: string, data: UpstreamRequest) {
        const upstreamData = this.validator.validateUpstream(data);
        const url = `/targets/${targetId}/upstream`;
        return this.connector.execute('put', url, upstreamData, null);
    }

    delete(upstreamId: string) {
        const url = `/upstreams/${upstreamId}`;
        this.connector.execute('delete', url, null, null);
    }

    deleteByTarget(targetId: string) {
        const url = '/targets/' + targetId + '/upstream';
        return this.connector.execute('delete', url, null, null);
    }


}