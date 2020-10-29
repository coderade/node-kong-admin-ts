'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Connector'... Remove this comment to see the full error message
const Connector = require('../connector');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Tag'.
class Tag {
  connector: any;
  params: any;

  constructor(params: any) {
    this.params = params;
    this.connector = new Connector(params);
  }

  list(offset: any, cb: any) {

    this.connector.execute('get', '/tags', null, offset ? {offset: offset} : null, cb);

  }

  listByTags(tags: any, offset: any, cb: any) {

    this.connector.execute('get', '/tags/' + tags, null, offset ? {offset: offset} : null, cb);

  }
}


// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = Tag;

