'use strict'
import {Connector} from '../connector'

export class Certificate {
    connector: any;
    params: any;
    validate: any;

    constructor(params: any) {
        this.params = params;
        this.connector = new Connector(params);
    }

    create(data: any) {
        const url = '/certificates';
        data = this.validate(data);
        return this.connector.execute('post', url, data, null);
    }

    get(certificateId: any) {
        const url = '/certificates/' + certificateId;
        return this.connector.execute('get', url, null, null);
    }

    list(offset: any) {
        const url = '/certificates';
        return this.connector.execute('get', url, null, {offset: offset});
    }

    update(data: any) {
        const url = '/certificates/' + data.id;
        data = this.validate(data);
        return this.connector.execute('patch', url, data, null);
    }

    updateOrCreate(data: any) {
        const url = '/certificates/' + data.id;
        data = this.validate(data);
        return this.connector.execute('put', url, data, null);
    }

    delete(certificateId: any) {
        const url = '/certificates/' + certificateId;
        return this.connector.execute('delete', url, null, null);

    }
}

