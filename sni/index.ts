'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Connector'... Remove this comment to see the full error message
const Connector = require('../connector');

class SNI {
  connector: any;
  params: any;

  constructor(params: any) {
    this.params = params;
    this.connector = new Connector(params);

  }

  create(data: any, cb: any) {

    this.connector.execute('post', '/snis', this.validate(data), null, cb);

  }

  createByCertificate(certificateNameOrId: any, data: any, cb: any) {

    this.connector.execute('post', '/certificates/' + certificateNameOrId + '/snis', this.validate(data), null, cb);

  }

  get(sniId: any, cb: any) {

    this.connector.execute('get', '/snis/' + sniId, null, null, cb);

  }

  list(offset: any, cb: any) {

    this.connector.execute('get', '/snis', null, {offset: offset}, cb);

  }

  listByCertificate(certificateNameOrId: any, offset: any, cb: any) {

    this.connector.execute('get', '/certificates/' + certificateNameOrId + '/snis', null, {offset: offset}, cb);

  }

  update(data: any, cb: any) {

    this.connector.execute('patch', '/snis/' + (data.id || data.name), this.validate(data), null, cb);

  }

  updateOrCreate(data: any, cb: any) {

    this.connector.execute('put', '/snis/' + (data.id || data.name), this.validate(data), null, cb);

  }

  delete(sniNameOrId: any, cb: any) {

    this.connector.execute('delete', '/snis/' + sniNameOrId, null, null, cb);

  }

  validate(data: any) {

    if (!data || !(data instanceof Object)) throw new Error('Data must be an Object!');

    return {
      'name': data.name,
      'tags': data.tags,
      'certificate': data.certificate,
    };

  }
}


// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = SNI;

