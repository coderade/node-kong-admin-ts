'use strict';

// External libraries
const axios = require('axios');
const debug = require('debug')('node:kong:admin:connector');

// Library definitions
const TIMEOUT = 60000;

class Connector {
  constructor(queryString) {
    this.baseUrl = queryString.url;
    this.authParams = queryString.auth || null;
    this.requestHeaders = {
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
      headers: this.requestHeaders,
    };

    return new Promise((resolve, reject) => {

      if (this.requestHeaders.Authorization || !this.authParams) {
        resolve(null);
      } else {
        const data = {
          username: this.authUser,
          password: this.authPass,
        };

        axios.post(path, data, options).then(res => {

          this.requestHeaders.Authorization = res.body.id;
          resolve(res.data);

        }).catch(err => {
          const response = {
            error: err.error,
            body: err.body,
          };
          reject(response);
        });
      }


    });

  };

  get(path, queryString) {

    const url = this.baseUrl + path;

    return new Promise((resolve, reject) => {
      this.auth().then(() => {

        const options = {
          headers: this.requestHeaders,
          params: queryString || {},
        };

        axios.get(url, options).then(res => {
          resolve(res.data);
        }).catch(err => {
          if (err.code === 404) {
            resolve();
          } else {
            reject(err.message);
          }
        });

      }).catch(err => {
        reject(err);
      });
    });

  }

  post(path, data, queryString) {

    const url = this.baseUrl + path;

    return new Promise((resolve, reject) => {
      this.auth().then(() => {

        const options = {
          headers: this.requestHeaders,
          params: queryString || {},
        };

        axios.post(url, data, options).then(res => {
          resolve(res.data);
        }).catch(err => {
          reject(err.message);
        });

      }).catch(err => {
        reject(err);
      });
    });

  }

  postFile(path, filePath, queryString, cb) {

    this.auth(
      function(err) {
        if (err) return cb(err);


        UNIREST.post(self.baseUrl + path)
          .query(queryString || {})
          .headers(self.requestHeaders)
          .attach('file', filePath, {
            contentType: 'application/json',
          })
          .timeout(TIMEOUT)
          .end(function(response) {


            if (response.error) {
              return cb(response.body);
            }


            cb(null, response.body);
          });

      });

  }

  put(path, data, queryString, cb) {

    const url = this.baseUrl + path;

    return new Promise((resolve, reject) => {
      this.auth().then(() => {

        const options = {
          headers: this.requestHeaders,
          params: queryString || {},
        };

        axios.put(url, data, options).then(res => {
          resolve(res.data);
        }).catch(err => {
          reject(err.message);
        });

      }).catch(err => {
        reject(err);
      });
    });

  }

  patch(path, data, queryString, cb) {

    const url = this.baseUrl + path;

    return new Promise((resolve, reject) => {
      this.auth().then(() => {

        const options = {
          headers: this.requestHeaders,
          params: queryString || {},
        };

        axios.patch(url, data, options).then(res => {
          resolve(res.data);
        }).catch(err => {
          reject(err.message);
        });

      }).catch(err => {
        reject(err);
      });
    });

  }

  delete(path, queryString) {

    const url = this.baseUrl + path;

    return new Promise((resolve, reject) => {
      this.auth().then(() => {

        const options = {
          headers: this.requestHeaders,
          params: queryString || {},
        };

        axios.delete(url, options).then(res => {
          resolve();
        }).catch(err => {
          reject(err.message);
        });

      }).catch(err => {
        reject(err);
      });
    });

  }

  execute(action, url, data, queryString) {

    return new Promise((resolve, reject) => {

      if (data) {

        this[action](url, data, queryString).then(results => {
          resolve(results);
        }).catch(err => {
          reject(err);
        });

      } else {

        this[action](url, queryString).then(results => {
          resolve(results);
        }).catch(err => {
          reject(err);
        });
      }
    });
  }

}


module.exports = Connector;
