'use strict';
import axios from 'axios';
import * as fs from 'fs';
import {ConnectorParams, Header, QueryString} from "../types";

const TIMEOUT = 60000;

export class Connector {
    authParams: any;
    authPass: any;
    authUser: any;
    baseUrl: string;
    headers: Header

    constructor(params: ConnectorParams) {
        this.baseUrl = params.url;
        this.authParams = params.auth || null;
        this.headers = {
            'User-Agent': `NODE-KONG-ADMIN-1.0.0 (pid: ${process.pid}, uid: ${process.getuid()})`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Connection': 'keep-alive',
            'Authorization': null,
        };
    }

    auth(): Promise<any> {

        const path = this.baseUrl + '/Users/login';
        const options = {
            headers: this.headers,
        };

        return new Promise((resolve, reject) => {

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

                }).catch((err: Error) => {
                    const response = {
                        error: err.message
                    };
                    reject(response);
                });
            }


        });

    }

    get(path: string, queryString: QueryString): Promise<any> {

        const url = this.baseUrl + path;

        return new Promise((resolve, reject) => {
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

            }).catch((err: Error) => {
                reject(err);
            });
        });

    }

    post(path: string, data: Record<string, unknown>, queryString: QueryString): Promise<any> {

        const url = this.baseUrl + path;

        return new Promise((resolve, reject) => {
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

    postFile(path: string, filePath: string, queryString: QueryString): Promise<any> {

        const formData = new FormData();

        // @ts-expect-error TODO: Fix this
        formData.append('file', fs.createReadStream(filePath));

        const url = this.baseUrl + path;

        return new Promise((resolve, reject) => {
            this.auth().then(() => {
                this.headers['Content-Type'] = 'multipart/form-data';

                const options = {
                    headers: this.headers,
                    params: queryString || {},
                };

                axios.post(url, formData, options).then((res: any) => {
                    resolve(res.data);
                }).catch((err: Error) => {
                    reject(err.message);
                });

            }).catch((err: Error) => {
                reject(err);
            });
        });

    }

    put(path: string, data: Record<string, unknown>, queryString: QueryString): Promise<any> {

        const url = this.baseUrl + path;

        return new Promise((resolve, reject) => {
            this.auth().then(() => {

                const options = {
                    headers: this.headers,
                    params: queryString || {},
                };

                axios.put(url, data, options).then((res: any) => {
                    resolve(res.data);
                }).catch((err: Error) => {
                    reject(err.message);
                });

            }).catch((err: EXT_sRGB) => {
                reject(err);
            });
        });

    }

    patch(path: string, data: Record<string, unknown>, queryString: QueryString): Promise<any> {

        const url = this.baseUrl + path;

        return new Promise((resolve, reject) => {
            this.auth().then(() => {

                const options = {
                    headers: this.headers,
                    params: queryString || {},
                };

                axios.patch(url, data, options).then((res: any) => {
                    resolve(res.data);
                }).catch((err: Error) => {
                    reject(err.message);
                });

            }).catch((err: Error) => {
                reject(err);
            });
        });

    }

    delete(path: string, queryString?: QueryString, authToken?: string): Promise<never> {

        const url = this.baseUrl + path;

        return new Promise((resolve, reject) => {
            this.auth().then(() => {

                const options = {
                    headers: this.headers,
                    params: queryString || {},
                };

                axios.delete(url, options).then(() => {
                    resolve();
                }).catch((err: Error) => {
                    reject(err.message);
                });

            }).catch((err: Error) => {
                reject(err);
            });
        });

    }

    execute(action: string, url: string, data?: Record<string, unknown> | null,
            queryString?: QueryString | null, authToken?: Record<string, unknown>): Promise<any> {

        return new Promise((resolve, reject) => {

            if (data) {
                // @ts-expect-error ts-migrate(7052)
                this[action](url, data, queryString, authToken).then((res) => {
                    resolve(res);
                }).catch((err: Error) => {
                    reject(err);
                });

            } else {
                // @ts-expect-error ts-migrate(7052)
                this[action](url, queryString, authToken).then((res) => {
                    resolve(res);
                }).catch((err: Error) => {
                    reject(err);
                });
            }
        });
    }
}
