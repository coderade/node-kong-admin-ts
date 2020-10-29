'use strict';

// Library extensions
import {Config} from './config'
import {Node} from './node'
import {Tag} from './tag'
import {Service} from './service'
import {Route} from './route'
import {Upstream} from './upstream'
import {Target} from './target'
import {Consumer} from './consumer'
import {Plugin} from './plugin'
import {Certificate} from './certificate'
import {Sni} from './sni'

export class Kong {
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
