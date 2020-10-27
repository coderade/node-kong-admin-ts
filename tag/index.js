'use strict';

const CONNECTOR = require('../connector');

class Tag {

  constructor(params) {
    this.params = params;
    this.connector = new CONNECTOR(params);
  }

  list(offset, cb) {

    this.connector.execute('get', '/tags', null, offset ? {offset: offset} : null, cb);

  };

  listByTags(tags, offset, cb) {

    this.connector.execute('get', '/tags/' + tags, null, offset ? {offset: offset} : null, cb);

  };

}


module.exports = Tag;

