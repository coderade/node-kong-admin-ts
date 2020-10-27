'use strict';

// Library extensions
const CONFIG = require('./config');
const NODE = require('./node');
const TAG = require('./tag');
const SERVICE = require('./service');
const ROUTE = require('./route');
const UPSTREAM = require('./upstream');
const TARGET = require('./target');
const CONSUMER = require('./consumer');
const PLUGIN = require('./plugin');
const CERTIFICATE = require('./certificate');
const SNI = require('./sni');

class Kong {

  constructor(params) {

    this.url = params.url || 'https://localhost:8001';

    this.config = new CONFIG({url: this.url});
    this.node = new NODE({url: this.url});
    this.tag = new TAG({url: this.url});
    this.service = new SERVICE({url: this.url});
    this.route = new ROUTE({url: this.url});
    this.upstream = new UPSTREAM({url: this.url});
    this.target = new TARGET({url: this.url});
    this.consumer = new CONSUMER({url: this.url});
    this.plugin = new PLUGIN({url: this.url});
    this.certificate = new CERTIFICATE({url: this.url});
    this.sni = new SNI({url: this.url});
  }

}

module.exports = Kong;
