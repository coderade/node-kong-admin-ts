'use strict';

// External libraries
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const axios = require('axios');
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const fs = require('fs');
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const debug = require('debug')('node:kong:admin:connector');

// Library definitions
const TIMEOUT = 60000;

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Connector'... Remove this comment to see the full error message
class Connector {
  authParams: any;
  authPass: any;
  authUser: any;
  baseUrl: any;
  headers: any;
  constructor(queryString: any) {
    this.baseUrl = queryString.url;
    this.authParams = queryString.auth || null;
    this.headers = {
      // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
      'User-Agent': 'NODE-KONG-ADMIN-1.0.0 (pid: ' + process.pid + ', uid: ' + process.getuid() + ')',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Connection': 'keep-alive',
      'Authorization': null,
    };
  }

  auth() {

    const path = this.baseUrl + '/Users/login';
    const options = {
      headers: this.headers,
    };

    // @ts-expect-error ts-migrate(2585) FIXME: 'Promise' only refers to a type, but is being used... Remove this comment to see the full error message
    return new Promise((resolve: any, reject: any) => {

      if (this.headers.Authorization || !this.authParams) {

        resolve(null);

      } else {

        const data = {
          username: this.authUser,
          password: this.authPass,
        };

        axios.post(path, data, options).then((res: any) => {

          this.headers.Authorization = res.body.id;
          resolve(res.data);

        }).catch((err: any) => {
          const response = {
            error: err.error,
            body: err.body,
          };
          reject(response);
        });
      }


    });

  }

  get(path: any, queryString: any) {

    const url = this.baseUrl + path;

    // @ts-expect-error ts-migrate(2585) FIXME: 'Promise' only refers to a type, but is being used... Remove this comment to see the full error message
    return new Promise((resolve: any, reject: any) => {
      this.auth().then(() => {

        const options = {
          headers: this.headers,
          params: queryString || {},
        };

        axios.get(url, options).then((res: any) => {
          resolve(res.data);
        }).catch((err: any) => {
          if (err.code === 404) {
            resolve();
          } else {
            reject(err.message);
          }
        });

      }).catch((err: any) => {
        reject(err);
      });
    });

  }

  post(path: any, data: any, queryString: any) {

    const url = this.baseUrl + path;

    // @ts-expect-error ts-migrate(2585) FIXME: 'Promise' only refers to a type, but is being used... Remove this comment to see the full error message
    return new Promise((resolve: any, reject: any) => {
      this.auth().then(() => {

        const options = {
          headers: this.headers,
          params: queryString || {},
        };

        axios.post(url, data, options).then((res: any) => {
          resolve(res.data);
        }).catch((err: any) => {
          reject(err.message);
        });

      }).catch((err: any) => {
        reject(err);
      });
    });

  }

  postFile(path: any, filePath: any, queryString: any) {

    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    const url = this.baseUrl + path;

    // @ts-expect-error ts-migrate(2585) FIXME: 'Promise' only refers to a type, but is being used... Remove this comment to see the full error message
    return new Promise((resolve: any, reject: any) => {
      this.auth().then(() => {
        this.headers['Content-Type'] = 'multipart/form-data';

        const options = {
          headers: this.headers,
          params: queryString || {},
        };

        axios.post(url, formData, options).then((res: any) => {
          resolve(res.data);
        }).catch((err: any) => {
          reject(err.message);
        });

      }).catch((err: any) => {
        reject(err);
      });
    });

  }

  put(path: any, data: any, queryString: any) {

    const url = this.baseUrl + path;

    // @ts-expect-error ts-migrate(2585) FIXME: 'Promise' only refers to a type, but is being used... Remove this comment to see the full error message
    return new Promise((resolve: any, reject: any) => {
      this.auth().then(() => {

        const options = {
          headers: this.headers,
          params: queryString || {},
        };

        axios.put(url, data, options).then((res: any) => {
          resolve(res.data);
        }).catch((err: any) => {
          reject(err.message);
        });

      }).catch((err: any) => {
        reject(err);
      });
    });

  }

  patch(path: any, data: any, queryString: any) {

    const url = this.baseUrl + path;

    // @ts-expect-error ts-migrate(2585) FIXME: 'Promise' only refers to a type, but is being used... Remove this comment to see the full error message
    return new Promise((resolve: any, reject: any) => {
      this.auth().then(() => {

        const options = {
          headers: this.headers,
          params: queryString || {},
        };

        axios.patch(url, data, options).then((res: any) => {
          resolve(res.data);
        }).catch((err: any) => {
          reject(err.message);
        });

      }).catch((err: any) => {
        reject(err);
      });
    });

  }

  delete(path: any, queryString: any, authToken: any) {

    const url = this.baseUrl + path;

    // this.headers.Authorization = authToken;

    // @ts-expect-error ts-migrate(2585) FIXME: 'Promise' only refers to a type, but is being used... Remove this comment to see the full error message
    return new Promise((resolve: any, reject: any) => {
      this.auth().then(() => {

        const options = {
          headers: this.headers,
          params: queryString || {},
        };

        axios.delete(url, options).then(() => {
          resolve();
        }).catch((err: any) => {
          reject(err.message);
        });

      }).catch((err: any) => {
        reject(err);
      });
    });

  }

  execute(action: any, url: any, data: any, queryString: any, authToken: any) {

    // @ts-expect-error ts-migrate(2585) FIXME: 'Promise' only refers to a type, but is being used... Remove this comment to see the full error message
    return new Promise((resolve: any, reject: any) => {

      if (data) {

        // @ts-expect-error ts-migrate(7052) FIXME: Element implicitly has an 'any' type because type ... Remove this comment to see the full error message
        this[action](url, data, queryString, authToken).then((results: any) => {
          resolve(results);
        }).catch((err: any) => {
          reject(err);
        });

      } else {

        // @ts-expect-error ts-migrate(7052) FIXME: Element implicitly has an 'any' type because type ... Remove this comment to see the full error message
        this[action](url, queryString, authToken).then((results: any) => {
          resolve(results);
        }).catch((err: any) => {
          reject(err);
        });
      }
    });
  }
}


// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = Connector;
