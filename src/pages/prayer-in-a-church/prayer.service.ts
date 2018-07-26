import{ Injectable } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
@Injectable()
export class Prayer {

    constructor(
      //private storageservice: StorageService,
      private apiservice: ApiService
      // private userService: UserService
    ) { }
  
  
  
  
  
  
  
    //////////FOR SIGNUP ///////////////////
  
    sendprayerdata(data) {
      let api_url = "sendAPrayer";
      return this.apiservice.post_genreral(api_url, JSON.stringify(data));
      }
      
  }