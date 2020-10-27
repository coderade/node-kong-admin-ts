'use strict';

const Connector = require('../connector');

class Certificate {

  constructor(params) {
    this.params = params;
    this.connector = new Connector(params);
  }

  create(data, cb) {

    this.connector.execute('post', '/certificates', this.validate(data), null, cb);

  };

  get(certificateId, cb) {

    this.connector.execute('get', '/certificates/' + certificateId, null, null, cb);

  };

  list(offset, cb) {

    this.connector.execute('get', '/certificates', null, {offset: offset}, cb);

  };

  update(data, cb) {

    this.connector.execute('patch', '/certificates/' + data.id, this.validate(data), null, cb);

  };

  updateOrCreate(data, cb) {

    this.connector.execute('put', '/certificates/' + data.id, this.validate(data), null, cb);

  };

  delete(certificateId, cb) {

    this.connector.execute('delete', '/certificates/' + certificateId, null, null, cb);

  };

  validate(data) {

    if (!data || !(data instanceof Object)) throw new Error('Data must be an Object!');

    return {
      'cert': data.cert,
      'key': data.key,
      'tags': data.tags,
      'snis': data.snis,
    };

  };
}


module.exports = Certificate;

