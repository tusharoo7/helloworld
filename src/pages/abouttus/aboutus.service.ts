import{ Injectable } from '@angular/core';
import { ApitwoService } from '../../services/api/apitwo.service';
@Injectable()
export class Aboutus {

    constructor(
      //private storageservice: StorageService,
      private apiservice: ApitwoService
      // private userService: UserService
    ) { }
  
  
  
  
  
  
  
    //////////FOR SIGNUP ///////////////////
  
    aboutsus(data) {
      let api_url = "cmsContent";
      return this.apiservice.post_genreral(api_url, JSON.stringify(data));
      }
      
  }