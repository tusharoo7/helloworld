import{ Injectable } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
@Injectable()
export class Privacyploicy {

    constructor(
      //private storageservice: StorageService,
      private apiservice: ApiService
      // private userService: UserService
    ) { }
  
  
  
  
  
  
  
    //////////FOR SIGNUP ///////////////////
  
    privacypolicidata(data) {
      let api_url = "cmsContent";
      return this.apiservice.post_genreral(api_url, JSON.stringify(data));
      }
      
  }