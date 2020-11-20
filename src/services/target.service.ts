'use strict';
import {Connector} from '../connector'
import {ConnectorParams, TargetList, TargetRequest, TargetResponse} from "../types";
import {DataValidator} from "../validators";

export class Target {
    connector: Connector;
    params: ConnectorParams;
    validator: DataValidator
    
    constructor(params: ConnectorParams) {
        this.params = params;
        this.connector = new Connector(params);
        this.validator = new DataValidator();
    }

    create(data: TargetRequest): Promise<TargetResponse> {
        const upstreamId = data.upstream || data.target;
        const url = `/upstreams/${upstreamId}/targets`
        const targetData = this.validator.validateTargetData(data)
        return this.connector.execute('post', url, targetData, null);
    }

    list(upstreamId: string, offset: string): Promise<TargetList> {
        const url = `/upstreams/${upstreamId}/targets`
        const queryString = offset ? {offset: offset} : null;
        return this.connector.execute('get', url, null, queryString);
    }

    listAll(upstreamId: string): Promise<TargetList> {
        const url = `/upstreams/${upstreamId}/targets/all`
        return this.connector.execute('get', url, null, null);
    }

    delete(upstreamId: string, targetId: string): Promise<void> {
        const url = `/upstreams/${upstreamId}/targets/${targetId}`;
        return this.connector.execute('delete', url, null, null);
    }

    setHealthy(upstreamId: string, targetId: string): Promise<void> {
        const url = `/upstreams/${upstreamId}/targets/${targetId}/healthy`;
        return this.connector.execute('post', url, {}, null);
    }

    setUnhealthy(upstreamId: string, targetId: string): Promise<void> {
        const url = `/upstreams/${upstreamId}/targets/${targetId}/unhealthy`;
        return this.connector.execute('post', url, {}, null);
    }
}
