'use strict'
import {Connector} from '../connector'
import {CertificateList, CertificateRequest, CertificateResponse, ConnectorParams} from "../types";
import {DataValidator} from "../validators";

export class Certificate {
    connector: Connector;
    params: ConnectorParams;
    validator: DataValidator

    constructor(params: ConnectorParams) {
        this.params = params;
        this.connector = new Connector(params);
        this.validator = new DataValidator();
    }

    create(data: CertificateRequest): Promise<CertificateResponse> {
        const url = '/certificates';
        return this.connector.execute('post', url, data, null);
    }

    get(certificateId: string): Promise<CertificateResponse> {
        const url = `/certificates/${certificateId}`
        return this.connector.execute('get', url, null, null)
    }

    list(offset: string): Promise<CertificateList> {
        const url = '/certificates'
        const queryString = offset ? {offset: offset} : null;
        return this.connector.execute('get', url, null, queryString);
    }

    update(data: CertificateRequest): Promise<CertificateResponse> {
        const url = `/certificates/${data.id}`;
        return this.connector.execute('patch', url, data, null);
    }

    updateOrCreate(data: CertificateRequest): Promise<CertificateResponse> {
        const url = `/certificates/${data.id}`;
        return this.connector.execute('put', url, data, null);
    }

    delete(certificateId: string): Promise<void> {
        const url = `/certificates/${certificateId}`;
        return this.connector.execute('delete', url, null, null);

    }
}

