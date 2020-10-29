'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Connector'... Remove this comment to see the full error message
const Connector = require('../connector');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Config'.
class Config {
  connector: any;
  params: any;

  constructor(params: any) {
    this.params = params;
    this.connector = new Connector(params);
  }

  dbLess = function(filePath: any) {

    // @ts-expect-error ts-migrate(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
    return this.connector.execute('postFile', '/config', filePath, null);

  };
}


// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = Config;

