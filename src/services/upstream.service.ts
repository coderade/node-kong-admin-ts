'use strict';
import {Connector} from '../connector'
import {DataValidator} from "../validators";
import {UpstreamRequest, UpstreamResponse, ConnectorParams, UpstreamList, UpstreamsHealth} from "../types";

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

    getByTarget(targetId: string): Promise<UpstreamResponse> {
        const url = `/targets/${targetId}/upstream`
        return this.connector.execute('get', url, null, null);
    }

    health(upstreamId: string, balancerHealth: string) : Promise<UpstreamsHealth>{
        const queryString = balancerHealth ? {balancer_health: balancerHealth} : null
        const url = `/upstreams/${upstreamId}/health`;
        return this.connector.execute('get', url, null, queryString);
    }

    list(offset: string): Promise<UpstreamList> {
        const queryString = offset ? {offset: offset} : null;
        return this.connector.execute('get', '/upstreams', null, queryString);
    }

    update(data: UpstreamRequest): Promise<UpstreamResponse> {
        const upstreamData = this.validator.validateUpstream(data);
        const url = `/upstreams/${upstreamData.id || upstreamData.name}`;
        return this.connector.execute('patch', url, upstreamData, null);
    }

    updateByTarget(targetId: string, data: UpstreamRequest): Promise<UpstreamResponse> {
        const upstreamData = this.validator.validateUpstream(data);
        const url = `/targets/${targetId}/upstream`;
        return this.connector.execute('patch', url, upstreamData, null);
    }

    updateOrCreate(data: UpstreamRequest): Promise<UpstreamResponse> {
        const upstreamData = this.validator.validateUpstream(data);
        const url = `/upstreams/${upstreamData.id || upstreamData.name}`;
        return this.connector.execute('put', url, upstreamData, null);
    }

    updateOrCreateByTarget(targetId: string, data: UpstreamRequest): Promise<UpstreamResponse> {
        const upstreamData = this.validator.validateUpstream(data);
        const url = `/targets/${targetId}/upstream`;
        return this.connector.execute('put', url, upstreamData, null);
    }

    delete(upstreamId: string): Promise<void> {
        const url = `/upstreams/${upstreamId}`;
        return this.connector.execute('delete', url, null, null);
    }

    deleteByTarget(targetId: string): Promise<void> {
        const url = '/targets/' + targetId + '/upstream';
        return this.connector.execute('delete', url, null, null);
    }


}