'use strict';
import {Connector} from '../connector'
import {ConnectorParams, SniRequest} from "../types";
import {DataValidator} from "../validators";

export class Sni {
    connector: Connector;
    params: ConnectorParams;
    validator: DataValidator;

    constructor(params: ConnectorParams) {
        this.params = params;
        this.connector = new Connector(params);
        this.validator = new DataValidator();
    }

    create(data: SniRequest) {
        data = this.validator.validateSni(data)
        return this.connector.execute('post', '/snis', data, null);
    }

    createByCertificate(certificateId: string, data: SniRequest) {
        data = this.validator.validateSni(data)
        const url = `/certificates/${certificateId}/snis`;
        return this.connector.execute('post', url, data, null);
    }

    get(sniId: string) {
        const url = `/snis/${sniId}`
        return this.connector.execute('get', url, null, null);
    }

    list(offset: string) {
        const queryString = offset ? {offset: offset} : null;
        return this.connector.execute('get', '/snis', null, queryString);
    }

    listByCertificate(certificateNameOrId: string, offset: string) {
        const url = `/certificates/${certificateNameOrId}/snis`;
        const queryString = offset ? {offset: offset} : null;
        return this.connector.execute('get', url, null, queryString);
    }

    update(data: SniRequest) {
        data = this.validator.validateSni(data)
        const url = `/snis/${data.id || data.name}`;
        return this.connector.execute('patch', url, data, null);
    }

    updateOrCreate(data: SniRequest) {
        data = this.validator.validateSni(data)
        const url = `/snis/${data.id || data.name}`;
        return this.connector.execute('put', url, data, null);
    }

    delete(sniId: string) {
        const url = `/snis/${sniId}`;
        return this.connector.execute('delete', url, null, null);
    }
}
