'use strict';

const Connector = require('../connector');

class Config {

  constructor(params) {
    this.params = params;

    this.connector = new Connector(params);
  }

  dbLess = function(filePath, cb) {

    this.connector.execute('postFile', '/config', filePath, null, cb);

  };

}


module.exports = Config;

