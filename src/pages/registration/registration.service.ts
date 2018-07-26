import{ Injectable } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
@Injectable()
export class RegistrationService {

    constructor(
      //private storageservice: StorageService,
      private apiservice: ApiService
      // private userService: UserService
    ) { }
  
  
   
  
  
  
  
    //////////FOR SIGNUP ///////////////////
  
    registrationdata(data) {
      let api_url = "registration";
    return this.apiservice.post_genreral(api_url, JSON.stringify(data));
  
    }
  }