'use strict';

// External libraries
const UNIREST = require('unirest');
const debug = require('debug')('node:kong:admin:connector');

// Library definitions
const TIMEOUT = 60000;


class connector {
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


  auth(cb) {

    const self = this;

    if (self.requestHeaders.Authorization || !this.authParams) return cb();

    const data = {
      username: self.authUser,
      password: self.authPass,
    };


    UNIREST.post(self.baseUrl + '/Users/login')
      .headers(self.requestHeaders)
      .send(data)
      .timeout(TIMEOUT)
      .end(function(response) {


        if (response.error) {
          return cb({
            error: response.error,
            body: response.body,
          });
        }


        self.requestHeaders.Authorization = response.body.id;

        cb();
      });
  };

  get(path, queryString, cb) {

    const self = this;

    self.auth(function(err) {
      if (err) return cb(err);


      UNIREST.get(self.baseUrl + path)
        .query(queryString || {})
        .headers(self.requestHeaders)
        .timeout(TIMEOUT)
        .end(function(response) {


          if (response.error) {
            // This is the only situation where a 404 error must be ignored
            if (response.code === 404) return cb();
            return cb(response.body);
          }

          cb(null, response.body);
        });
    });
  };

  post(path, data, queryString, cb) {

    const self = this;

    self.auth(function(err) {
      if (err) return cb(err);


      UNIREST.post(self.baseUrl + path)
        .query(queryString || {})
        .headers(self.requestHeaders)
        .send(data)
        .timeout(TIMEOUT)
        .end(function(response) {


          if (response.error) {
            return cb(response.body);
          }


          cb(null, response.body);
        });
    });
  };

  postFile(path, filePath, queryString, cb) {


    const self = this;

    self.auth(function(err) {
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

  };

  put(path, data, queryString, cb) {


    const self = this;

    self.auth(function(err) {
      if (err) return cb(err);


      UNIREST.put(self.baseUrl + path)
        .query(queryString || {})
        .headers(self.requestHeaders)
        .send(data)
        .timeout(TIMEOUT)
        .end(function(response) {

          if (response.error) {
            return cb(response.body);
          }

          cb(null, response.body);
        });
    });
  };

  patch(path, data, queryString, cb) {


    const self = this;

    self.auth(function(err) {
      if (err) return cb(err);


      UNIREST.patch(self.baseUrl + path)
        .query(queryString || {})
        .headers(self.requestHeaders)
        .send(data)
        .timeout(TIMEOUT)
        .end(function(response) {

          if (response.error) {
            return cb(response.body);
          }

          cb(null, response.body);
        });
    });
  };

  delete(path, queryString, cb) {


    const self = this;

    self.auth(function(err) {
      if (err) return cb(err);


      UNIREST.delete(self.baseUrl + path)
        .query(queryString || {})
        .headers(self.requestHeaders)
        .timeout(TIMEOUT)
        .end(function(response) {


          if (response.error) {
            return cb(response.body);
          }


          cb();
        });
    });
  };

  execute(action, url, data, queryString, cb) {


    if (data) {

      this[action](url, data, queryString, function(err, results) {

        if (err) {
          return cb(err);
        }


        cb(null, results);

      });
    } else {


      this[action](url, queryString, function(err, results) {

        if (err) {
          return cb(err);
        }


        cb(null, results);

      });
    }

  };

}


module.exports = Connector;
