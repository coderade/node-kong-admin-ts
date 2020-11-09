'use strict';

import {ConsumerRequest, SniRequest, TargetRequest, UpstreamRequest} from "../types";

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

    validateUpstream(data: UpstreamRequest) {
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

    validateSni(data: SniRequest) {

        if (!data) {
            throw new Error('Data must be of the SniRequest type');
        }
        return {
            'name': data.name,
            'tags': data.tags,
            'certificate': data.certificate,
        };

    }


}