'use strict';

const Connector = require('../connector');

class Node {
  constructor(params) {
    this.params = params;
    this.connector = new Connector(params);
  }

  get(cb) {
    this.connector.execute('get', '/', null, null, cb);
  };

  status(cb) {
    this.connector.execute('get', '/status', null, null, cb);
  };
}


module.exports = Node;

