'use strict';

// Library extensions
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Config'.
const Config = require('./config');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Node'.
const Node = require('./node');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Tag'.
const Tag = require('./tag');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Service'.
const Service = require('./service');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Route'.
const Route = require('./route');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Upstream'.
const Upstream = require('./upstream');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Target'.
const Target = require('./target');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Consumer'.
const Consumer = require('./consumer');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Plugin'.
const Plugin = require('./plugin');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Certificat... Remove this comment to see the full error message
const Certificate = require('./certificate');
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const Sni = require('./sni');

class Kong {
  certificate: any;
  config: any;
  consumer: any;
  node: any;
  plugin: any;
  route: any;
  service: any;
  sni: any;
  tag: any;
  target: any;
  upstream: any;
  url: any;

  constructor(params: any) {

    this.url = {url: params.url || 'https://localhost:8001'};

    this.config = new Config(this.url);
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
    this.node = new Node(this.url);
    this.tag = new Tag(this.url);
    this.service = new Service(this.url);
    this.route = new Route(this.url);
    this.upstream = new Upstream(this.url);
    this.target = new Target(this.url);
    this.consumer = new Consumer(this.url);
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
    this.plugin = new Plugin(this.url);
    this.certificate = new Certificate(this.url);
    this.sni = new Sni(this.url);
  }
}

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = Kong;
