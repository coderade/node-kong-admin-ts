'use strict';

const Connector = require('../connector');

class Node {
  constructor(params) {
    this.params = params;
    this.connector = new Connector(params);
  }

  get() {
    return this.connector.execute('get', '/', null, null);
  };

  status() {
    return this.connector.execute('get', '/status', null, null);
  };
}


module.exports = Node;

