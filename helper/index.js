'use strict';


class DataValidator {

  constructor() {}

  validate(data) {

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


module.exports = DataValidator;

