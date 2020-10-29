'use strict';

export class DataValidator {

  constructor() {}

  validate(data: any) {

    if (!data || !(data instanceof Object)) {
      throw new Error('Data must be an Object!');
    }

    return {
      'username': data.username,
      'custom_id': data.custom_id,
      'tags': data.tags,
    };

  };

}

