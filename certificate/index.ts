'use strict';
const Connector = require('../connector');

class Certificate {

  constructor(params) {
    this.params = params;
    this.connector = new Connector(params);
  }

  create(data) {
    const url = '/certificates';
    data = this.validate(data);
    return this.connector.execute('post', url, data, null);
  };

  get(certificateId) {
    const url = '/certificates/' + certificateId;
    return this.connector.execute('get', url, null, null);
  };

  list(offset) {
    const url = '/certificates';
    return this.connector.execute('get', url, null, {offset: offset});
  };

  update(data) {
    const url = '/certificates/' + data.id;
    data = this.validate(data);
    return this.connector.execute('patch', url, data, null);
  };

  updateOrCreate(data) {
    const url = '/certificates/' + data.id;
    data = this.validate(data);
    return this.connector.execute('put', url, data, null);
  };

  delete(certificateId) {
    const url = '/certificates/' + certificateId;
    return this.connector.execute('delete', url, null, null);

  };
}


module.exports = Certificate;

