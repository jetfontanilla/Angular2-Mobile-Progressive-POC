// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

declare var EC_CONFIG: any;

@Injectable()
export class ConnectionFactoryService {
    static SERVICE_URL = {
        bridge: '/api/bridge',
        tutor: '/api/tutor',
        postoffice: '/api/postoffice',
        reportcard: '/api/reportcard',
        meterman: '/api/meterman',
        site: '/rest',
        base: '',
        commerce: '/api/bridge/commerce',
        content: '/api/bridge/content',
        identity: '/api/bridge/identity'
    };

    static SERVICE_ACCEPT_HEADERS = {
        v1: 'application/vnd.englishcentral-v1+json,application/json;q=0.9,*/*;q=0.8',
        v2: 'application/vnd.englishcentral-v2+json,application/json;q=0.9,*/*;q=0.8',
        v4: 'application/vnd.englishcentral-v4+json,application/json;q=0.9,*/*;q=0.8'
    };

    static METHOD_GET = 'get';
    static METHOD_POST = 'post';
    static METHOD_PUT = 'put';
    static METHOD_DELETE = 'delete';

    constructor(private http: Http) {
    }

    ngOnInit() {

    }

    service(connectionName?: string) {

        let baseServiceUrl = connectionName && connectionName in ConnectionFactoryService.SERVICE_URL
            ? ConnectionFactoryService.SERVICE_URL[connectionName]
            : ConnectionFactoryService.SERVICE_URL.base;

        let request = function(method: string,
                               requestUrl: string,
                               query?: Object,
                               postBody?: any,
                               additionalHeaders?: Object): Observable<Object> {
            let params = new URLSearchParams();
            if (query) {
                _.forEach(query, (value, key) => params.set(key, value));
            }
            //let url = EC_CONFIG.basePath + requestUrl;
            let url = 'http://www.devenglishcentral.com' + requestUrl;
            let body = postBody ? JSON.stringify(postBody) : '';
            let headers = new Headers(_.assign({'Content-Type': 'application/json'}, additionalHeaders));
            let options = new RequestOptions({headers: headers, search: params});

            var response: Observable<Response>;

            switch (method) {
                case ConnectionFactoryService.METHOD_GET:
                    response = this.http.get(url, options);
                    break;
                case ConnectionFactoryService.METHOD_POST:
                    response = this.http.post(url, body, options);
                    break;
                case ConnectionFactoryService.METHOD_PUT:
                    response = this.http.put(url, body, options);
                    break;
                case ConnectionFactoryService.METHOD_DELETE:
                    response = this.http.delete(url, options);
                    break;
                default:
                    return Observable.throw('Invalid HTTP method');
            }

            return response.map(this._extractData).catch(this._handleError);
        };

        let getAcceptHeader = function(version?: string): Object {
            if (!version) {
                return {}
            }

            return version in ConnectionFactoryService.SERVICE_ACCEPT_HEADERS
                ? ConnectionFactoryService.SERVICE_ACCEPT_HEADERS[version]
                : {};
        };

        return {
            serviceUrl: baseServiceUrl,
            path: function(path: string) {
                this.serviceUrl += path;
                return this;
            },
            get: function(query?: Object, postBody?: any, version?: string): Observable<Object> {
                return request(ConnectionFactoryService.METHOD_GET, this.serviceUrl, query, postBody, getAcceptHeader(version));
            },
            post: function(query?: Object, postBody?: any, version?: string): Observable<Object> {
                return request(ConnectionFactoryService.METHOD_POST, this.serviceUrl, query, postBody, getAcceptHeader(version));
            },
            put: function(query?: Object, postBody?: any, version?: string): Observable<Object> {
                return request(ConnectionFactoryService.METHOD_PUT, this.serviceUrl, query, postBody, getAcceptHeader(version));
            },
            delete: function(query?: Object, postBody?: any, version?: string): Observable<Object> {
                return request(ConnectionFactoryService.METHOD_DELETE, this.serviceUrl, query, postBody, getAcceptHeader(version));
            }
        };


    }

    private _extractData(res: Response): Object {
        let body = res.json();
        return body.data || {};
    }

    private _handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}
