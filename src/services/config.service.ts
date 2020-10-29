'use strict';
import {Connector} from '../connector'
import {ConnectorParams} from "../types";

export class Config {
    connector: Connector;
    params: ConnectorParams;

    constructor(params: ConnectorParams) {
        this.params = params;
        this.connector = new Connector(params);
    }

    dbLess = (filePath: string): Promise<any> => {

        const file = {filePath: filePath}
        return this.connector.execute('postFile', '/config', file, undefined);

    };
}

