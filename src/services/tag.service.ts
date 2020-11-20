'use strict';
import {Connector} from '../connector'
import {ConnectorParams,TagList} from "../types";


export class Tag {
    connector: Connector;
    params: ConnectorParams;

    constructor(params: ConnectorParams) {
        this.params = params;
        this.connector = new Connector(params);
    }

    list(offset: string): Promise<TagList> {
        const queryString = offset ? {offset: offset} : null;
        return this.connector.execute('get', '/tags', null, queryString);
    }

    listByTags(tags: string, offset: string): Promise<TagList> {
        const url = `/tags/${tags}`;
        const queryString = offset ? {offset: offset} : null;
        return this.connector.execute('get', url, null, queryString);
    }
}

