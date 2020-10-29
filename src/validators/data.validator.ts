'use strict';

import {ConsumerRequest} from "../types";

export class DataValidator {

    validate(data: ConsumerRequest): ConsumerRequest {

        if (!data) {
            throw new Error('Data must be an Object!');
        }

        return {
            username: data.username,
            custom_id: data.custom_id,
            tags: data.tags
        };

    }

}