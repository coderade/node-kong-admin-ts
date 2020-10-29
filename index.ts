'use strict';

// Library extensions
const Config = require('./config');
const Node = require('./node');
const Tag = require('./tag');
const Service = require('./service');
const Route = require('./route');
const Upstream = require('./upstream');
const Target = require('./target');
const Consumer = require('./consumer');
const Plugin = require('./plugin');
const Certificate = require('./certificate');
const Sni = require('./sni');

class Kong {

  constructor(params) {

    this.url = {url: params.url || 'https://localhost:8001'};

    this.config = new Config(this.url);
    this.node = new Node(this.url);
    this.tag = new Tag(this.url);
    this.service = new Service(this.url);
    this.route = new Route(this.url);
    this.upstream = new Upstream(this.url);
    this.target = new Target(this.url);
    this.consumer = new Consumer(this.url);
    this.plugin = new Plugin(this.url);
    this.certificate = new Certificate(this.url);
    this.sni = new Sni(this.url);
  }

}

module.exports = Kong;
