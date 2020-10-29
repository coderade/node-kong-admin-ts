'use strict'
import {Connector} from '../connector'
import {ConnectorParams, ConsumerRequest} from "../types";
import {DataValidator} from "../validators";

export class Certificate {
    connector: Connector;
    params: Record<string, unknown>;
    validator: DataValidator

    constructor(params: ConnectorParams) {
        this.params = params;
        this.connector = new Connector(params);
        this.validator = new DataValidator();
    }

    create(data: ConsumerRequest): Promise<any> {
        const url = '/certificates';
        data = this.validator.validate(data);
        return this.connector.execute('post', url, data, null);
    }

    get(certificateId: string) {
        const url = '/certificates/' + certificateId;
        return this.connector.execute('get', url, null, null);
    }

    list(offset: string) {
        const url = '/certificates';
        return this.connector.execute('get', url, null, {offset: offset});
    }

    update(data: any) {
        const url = '/certificates/' + data.id;
        data = this.validator.validate(data)
        return this.connector.execute('patch', url, data, null);
    }

    updateOrCreate(data: any) {
        const url = '/certificates/' + data.id;
        data = this.validator.validate(data)
        return this.connector.execute('put', url, data, null);
    }

    delete(certificateId: any) {
        const url = '/certificates/' + certificateId;
        return this.connector.execute('delete', url, null, null);

    }
}

