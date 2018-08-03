import { Injectable } from '@angular/core';
import { 
  HttpClient , 
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';

import { Constants } from "../constants";
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';
 import 'rxjs/add/operator/catch';
const API_BASE_URL = Constants.API_BASE_URL;
//export interface Payload { }
@Injectable()
export class ApitwoService {

  private endPoint: string;

  constructor(
    private http: HttpClient
  ) {}

  public handleError(error: HttpErrorResponse) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
    }
  setApiEndpoint(route: string): void {
    this.endPoint = API_BASE_URL + "/" + route;
  }

  getApiEndPoint(): string {
    return this.endPoint;
  }

  getDefaultHeaders(): HttpHeaders {
    let defaultHeaders = new HttpHeaders({
            'Content-Type':  'application/x-www-form-urlencoded;charset=UTF-8',
             'xsrf-token': localStorage.getItem("xsrf_token")
           });
    
    return defaultHeaders;
  }

  post_genreral(route: string, paramsPayload: string): Observable<any>
  {
    console.log("hurray its worked fine !");
    this.setApiEndpoint(route);
    let urlSearchParams = new URLSearchParams();
    let paylod = JSON.parse(paramsPayload);
    for(let key in paylod)
    urlSearchParams.append(key, paylod[key]);
    let body = urlSearchParams.toString();
    this.setApiEndpoint(route);
    let httpRequestOptions = { headers: this.getDefaultHeaders() };
    return this.http.post(this.getApiEndPoint(), body, httpRequestOptions).catch(this.handleError);
  }
}
