'use strict';
import {Connector} from '../connector'
import {ConnectorParams, SniList, SniRequest, SniResponse} from "../types";
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

    create(data: SniRequest): Promise<SniResponse> {
        data = this.validator.validateSniRequest(data)
        return this.connector.execute('post', '/snis', data, null);
    }

    createByCertificate(certificateId: string, data: SniRequest): Promise<SniResponse> {
        data = this.validator.validateSniRequest(data)
        const url = `/certificates/${certificateId}/snis`;
        return this.connector.execute('post', url, data, null);
    }

    get(sniId: string): Promise<SniResponse> {
        const url = `/snis/${sniId}`
        return this.connector.execute('get', url, null, null);
    }

    list(offset: string): Promise<SniList> {
        const queryString = offset ? {offset: offset} : null;
        return this.connector.execute('get', '/snis', null, queryString);
    }

    listByCertificate(certificateNameOrId: string, offset: string): Promise<SniList> {
        const url = `/certificates/${certificateNameOrId}/snis`;
        const queryString = offset ? {offset: offset} : null;
        return this.connector.execute('get', url, null, queryString);
    }

    update(data: SniRequest): Promise<SniResponse> {
        data = this.validator.validateSniRequest(data)
        const url = `/snis/${data.id || data.name}`;
        return this.connector.execute('patch', url, data, null);
    }

    updateOrCreate(data: SniRequest): Promise<SniResponse> {
        data = this.validator.validateSniRequest(data)
        const url = `/snis/${data.id || data.name}`;
        return this.connector.execute('put', url, data, null);
    }

    delete(sniId: string): Promise<SniResponse> {
        const url = `/snis/${sniId}`;
        return this.connector.execute('delete', url, null, null);
    }
}
