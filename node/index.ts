'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Connector'... Remove this comment to see the full error message
const Connector = require('../connector');

// @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'Node'.
class Node {
  connector: any;
  params: any;
  constructor(params: any) {
    this.params = params;
    this.connector = new Connector(params);
  }

  get() {
    return this.connector.execute('get', '/', null, null);
  }

  status() {
    return this.connector.execute('get', '/status', null, null);
  }
}


// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = Node;

