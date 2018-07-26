import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api/api.service';

@Injectable()

export class SignUpService {

  constructor(
    //private storageservice: StorageService,
    private apiservice: ApiService
    // private userService: UserService
  ) { }





nn

  //////////FOR SIGNUP ///////////////////

  signup(data) {
    //data['user_type'] = 1;
    //console.log(JSON.stringify(data));
    let api_url = "login";
    return this.apiservice.post_genreral(api_url, JSON.stringify(data));

  }
}