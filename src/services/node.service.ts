'use strict';
import {Connector} from '../connector'
import {ConnectorParams} from "../types";

export class Node {
    connector: Connector;
    params: ConnectorParams;

    constructor(params: ConnectorParams) {
        this.params = params;
        this.connector = new Connector(params);
    }

    get() {
        return this.connector.execute('get', '/', null, null);
    }

    status() {
        return this.connector.execute('get', '/status', null, null);
    }
}

