'use strict';


class DataValidator {

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


// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = DataValidator;

