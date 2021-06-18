'use strict';

import {CertificateRequest, ConsumerRequest, SniRequest, TargetRequest, UpstreamRequest} from "../types";
import {ServiceRequest} from "../types/service";
import {PluginRequest} from "../types/plugin";
import {RouteRequest, RouteResponse} from "../types/route";

export class DataValidator {

    validate(data: ConsumerRequest): ConsumerRequest {

        if (!data) {
            throw new Error('Data must of the ConsumerRequest type');
        }

        return {
            username: data.username,
            custom_id: data.custom_id,
            tags: data.tags
        };

    }

    validateTargetData(data: TargetRequest) {

        if (!data) {
            throw new Error('Data must be of the TargetRequest type');
        }
        return {
            upstream: {id: data.upstream},
            target: data.target,
            weight: data.weight,
            tags: data.tags
        };
    }

    validateUpstream(data: UpstreamRequest): UpstreamRequest {

        if (!data) {
            throw new Error('Data must be of the UpstreamRequest type');
        }

        return {
            id: data.id || undefined,
            name: data.name,
            hash_on: data.hash_on || 'none',
            hash_fallback: data.hash_fallback || 'none',
            hash_on_cookie_path: data.hash_on_cookie_path || '/',
            slots: data.slots || 10000,
            healthchecks: data.healthchecks,
            tags: data.tags,
        };
    }

    validateSniRequest(data: SniRequest): SniRequest {

        if (!data) {
            throw new Error('Data must be of the SniRequest type');
        }
        return {
            name: data.name,
            tags: data.tags,
            certificate: data.certificate,
        };

    }

    validateService(data: ServiceRequest): ServiceRequest {

        if (!data) {
            throw new Error('Data must be of the ServiceRequest type');
        }

        return {
            name: data.name,
            retries: data.retries || 5,
            protocol: data.protocol || 'http',
            host: data.host,
            port: data.port || 80,
            path: data.path,
            connect_timeout: data.connect_timeout || 60000,
            write_timeout: data.write_timeout || 60000,
            read_timeout: data.read_timeout || 60000,
            tags: data.tags,
            url: data.url,
        };

    }


    validatePlugin(data: PluginRequest): PluginRequest {

        if (!data) {
            throw new Error('Data must be of the PluginRequest type');
        }

        return {
            name: data.name,
            route: data.route,
            service: data.service,
            consumer: data.consumer,
            config: data.config,
            run_on: data.run_on,
            protocols: data.protocols || ['http', 'https'],
            enabled: data.enabled,
            tags: data.tags,
        };

    }

    validateRouteRequest(data: RouteRequest): RouteRequest {

        if (!data) {
            throw new Error('Data must be of the RouteRequest type');
        }

        return {
            name: data.name,
            protocols: data.protocols || ['http', 'https'],
            methods: data.methods,
            hosts: data.hosts,
            paths: data.paths,
            regex_priority: data.regex_priority || 0,
            strip_path: data.strip_path,
            preserve_host: data.preserve_host,
            tags: data.tags,
            snis: data.snis,
            sources: data.sources,
            destinations: data.destinations,
            https_redirect_status_code: data.https_redirect_status_code || 301,
            service: data.service,
        };

    }


}