'use strict';

// Library extensions
import {Config} from './services'
import {Node} from './services'
import {Tag} from './services'
import {Service} from './services'
import {Route} from './services'
import {Upstream} from './services'
import {Target} from './services'
import {Consumer} from './services'
import {Plugin} from './services'
import {Certificate} from './services'
import {Sni} from './services'
import {ConnectorParams} from './types'

export class Kong {
    certificate: Certificate;
    config: Config;
    consumer: Consumer;
    node: Node;
    plugin: Plugin;
    route: Route;
    service: Service;
    sni: Sni;
    tag: Tag;
    target: Target;
    upstream: Upstream;

    constructor(params: ConnectorParams) {

        params = {url: params.url || 'https://localhost:8001'};

        this.config = new Config(params);
        this.node = new Node(params);
        this.tag = new Tag(params);
        this.service = new Service(params);
        this.route = new Route(params);
        this.upstream = new Upstream(params);
        this.target = new Target(params);
        this.consumer = new Consumer(params);
        this.plugin = new Plugin(params);
        this.certificate = new Certificate(params);
        this.sni = new Sni(params);
    }
}
