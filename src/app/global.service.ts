import { Injectable } from '@angular/core';
import { ApiService } from '../services/api/api.service';
@Injectable()

export class GlobalService {

  constructor(
    //private storageservice: StorageService,
    private apiservice: ApiService
    // private userService: UserService
  ) { }







  //////////FOR SIGNUP ///////////////////

  check_first_time(data) {
    //data['user_type'] = 1;
    //console.log(JSON.stringify(data));
    let api_url = "generateApiAccessKey";
    return this.apiservice.post_keyvaluepair(api_url, JSON.stringify(data));

  }
}