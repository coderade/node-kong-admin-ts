'use strict';

const Connector = require('../connector');

class SNI {

  constructor(params) {
    this.params = params;
    this.connector = new Connector(params);

  }

  create(data, cb) {

    this.connector.execute('post', '/snis', this.validate(data), null, cb);

  };

  createByCertificate(certificateNameOrId, data, cb) {

    this.connector.execute('post', '/certificates/' + certificateNameOrId + '/snis', this.validate(data), null, cb);

  };

  get(sniId, cb) {

    this.connector.execute('get', '/snis/' + sniId, null, null, cb);

  };

  list(offset, cb) {

    this.connector.execute('get', '/snis', null, {offset: offset}, cb);

  };

  listByCertificate(certificateNameOrId, offset, cb) {

    this.connector.execute('get', '/certificates/' + certificateNameOrId + '/snis', null, {offset: offset}, cb);

  };

  update(data, cb) {

    this.connector.execute('patch', '/snis/' + (data.id || data.name), this.validate(data), null, cb);

  };

  updateOrCreate(data, cb) {

    this.connector.execute('put', '/snis/' + (data.id || data.name), this.validate(data), null, cb);

  };

  delete(sniNameOrId, cb) {

    this.connector.execute('delete', '/snis/' + sniNameOrId, null, null, cb);

  };

  validate(data) {

    if (!data || !(data instanceof Object)) throw new Error('Data must be an Object!');

    return {
      'name': data.name,
      'tags': data.tags,
      'certificate': data.certificate,
    };

  };

}


module.exports = SNI;

