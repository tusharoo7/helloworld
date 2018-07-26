import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
@Injectable()
export class Searchworship
{
   constructor(private apiservice :ApiService){}
  
   optionlist(data)
   {
      let api_url = "worshipPlaceTypeList";
      return this.apiservice.post_genreral(api_url, JSON.stringify(data));
   } 
  searchlocation(data)
        {
            //console.log(JSON.stringify(data));
            //console.log(JSON.stringify(data));
           // let api_url = "location/search";
            // return this.apiservice.post(api_url, JSON.stringify(data));
            let api_url = "worshipPlaceList";
            return this.apiservice.post_genreral(api_url, JSON.stringify(data));
        }
 

}

/// for location serch
