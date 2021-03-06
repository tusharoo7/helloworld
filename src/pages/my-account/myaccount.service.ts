import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
/*
  Generated class for the MyaccountProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Myaccount {

  constructor(public http: HttpClient, private apiservice: ApiService) {
    console.log('Hello MyaccountProvider Provider');
  }
 
  updateprofile(data)
 {
  let api_url = "profileUpdate";
  return this.apiservice.post_genreral(api_url, JSON.stringify(data));
 }

 changepassword(data)
 {
  let api_url = "changePassword";
  return this.apiservice.post_genreral(api_url, JSON.stringify(data));
 }

 getpryerhistory(data)
 {
  let api_url = "prayerHistory";
  return this.apiservice.post_genreral(api_url, JSON.stringify(data));
 }

 getpaymenthistory(data)
 {
  let api_url = "donationHistory";
  return this.apiservice.post_genreral(api_url, JSON.stringify(data));
 }

 addsuggestedworshipplace(data)
 {
   let api_url = "suggestWorshipPlace";
  return this.apiservice.post_genreral(api_url, JSON.stringify(data));
 }
}
