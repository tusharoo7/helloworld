import{ Injectable } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
@Injectable()
export class ForgotPasswordService {

    constructor(
      //private storageservice: StorageService,
      private apiservice: ApiService
      // private userService: UserService
    ) { }
  
    //////////FOR SIGNUP ///////////////////
  
    forgotpassword(data) {
      //data['user_type'] = 1;
      //console.log(JSON.stringify(data));
      let api_url = "forgotPassword";
      return this.apiservice.post_genreral(api_url, JSON.stringify(data));
  
    }
  }