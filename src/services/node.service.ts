'use strict';
import {Connector} from '../connector'
import {ConnectorParams, NodeResponse, NodeStatusResponse} from "../types";

export class Node {
    connector: Connector;
    params: ConnectorParams;

    constructor(params: ConnectorParams) {
        this.params = params;
        this.connector = new Connector(params);
    }

    get(): Promise<NodeResponse> {
        return this.connector.execute('get', '/', null, null);
    }

    status(): Promise<NodeStatusResponse> {
        return this.connector.execute('get', '/status', null, null);
    }
}

