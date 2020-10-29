'use strict';
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Connector'... Remove this comment to see the full error message
const Connector = require('../connector');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Certificat... Remove this comment to see the full error message
class Certificate {
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


// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = Certificate;

