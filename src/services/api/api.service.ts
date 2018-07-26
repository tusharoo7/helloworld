import { Injectable } from '@angular/core';
// import { 
//   HttpClient , 
//   HttpRequest,
//   HttpResponse,
//   //HttpParams ,
//  // HttpHeaders

// } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Constants } from "../constants";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import { AuthService } from "../auth/auth.service";

const API_BASE_URL = Constants.API_BASE_URL;
export interface Payload { }
@Injectable()
export class ApiService {


  public extractData(res: Response) {
    let body = res.json();
    return body || {};
    }
    
    public handleError(error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
    }
  private endPoint: string;

  constructor(
    private http: Http
  //  private storageservice: StorageService,
  ) {}
  setApiEndpoint(route: string): void {
    this.endPoint = API_BASE_URL + "/" + route;
  }

 

  // getDefaultHeaders(): HttpHeaders {
  //   let defaultHeaders = new HttpHeaders();
  //    defaultHeaders.append("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
  //    defaultHeaders.append("xsrf-token", localStorage.getItem("xsrf_token"));
  //   return defaultHeaders;
    
  // }
 
 /**
  * getApiEndPoint - this method returns the set endpoint
  */
  getApiEndPoint(): string {
    return this.endPoint;
  }
  // post(route: string, paramsPayload: Payload): Observable<any> { 
  //   this.setApiEndpoint(route);
  //   let httpRequestOptions = { headers: this.getDefaultHeaders() };
  //   // if(this.isUserLoggedIn){
  //   //   httpRequestOptions['withCredentials'] = true;
  //   // }
  //  // console.log(paramsPayload);
  //  // console.log(this.getApiEndPoint());
  //  // console.log(httpRequestOptions);
  //   return this.http.post(this.getApiEndPoint(), paramsPayload, httpRequestOptions);
  // }

  post_keyvaluepair(route: string, paramsPayload: string): Observable<any> { 
    this.setApiEndpoint(route);
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    headers.append("xsrf-token", localStorage.getItem("xsrf_token"));
   // headers.append('Authorization', 'Bearer ' + token);

    let options = new RequestOptions({ headers: headers });
   
        let urlSearchParams = new URLSearchParams();
        let paylod = JSON.parse(paramsPayload);
        urlSearchParams.append('access_request_key', paylod.access_request_key);
        urlSearchParams.append('auth_token', paylod.auth_token);       
        let body = urlSearchParams.toString();
      				
    return this.http.post(this.getApiEndPoint(), body, options).map(this.extractData)
    .catch(this.handleError);
  }

  post_genreral(route: string, paramsPayload: string): Observable<any>
  {
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    headers.append("xsrf-token", localStorage.getItem("xsrf_token"));
    let options = new RequestOptions({ headers: headers });
    this.setApiEndpoint(route);
   
    let urlSearchParams = new URLSearchParams();
    let paylod = JSON.parse(paramsPayload);
    for(let key in paylod)
    urlSearchParams.append(key, paylod[key]);
    let body = urlSearchParams.toString();
    console.log(body);
    console.log(options);
    return this.http.post(this.getApiEndPoint(), body, options ).map(this.extractData)
    .catch(this.handleError);
  }
}
