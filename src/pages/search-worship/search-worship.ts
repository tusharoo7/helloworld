import { Component, NgZone  } from '@angular/core';

import { HttpClient} from '@angular/common/http';

//import { Searchworship } from './searchworship.service';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { SearchWorshipResultPage } from '../search-worship-result/search-worship-result';
import { FormBuilder, FormGroup } from '@angular/forms';
declare var google;
import { ApiService } from '../../services/api/api.service';
import { Searchworship } from './searchworship.service';
import { HelperService } from '../../services/helper/helper.service';
/**
 * Generated class for the SearchWorshipPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-worship',
  templateUrl: 'search-worship.html',
  providers: [HelperService,ApiService,Searchworship]
})
export class SearchWorshipPage {

    mosqueLocation:any;
    mosqueLat:any;
    mosqueLng:any;
    countryCode:any;

     location: any;
     GoogleAutocomplete: any;
      xyz : any;
     placeCat: Array<{id: any, catName: any}>;
     searchResultList : Array<{id: any, address: any,city: any,contact_number: any,country: any,
      country_cc: any, country_id: any , created_date: any ,image: any ,description: any ,disctrict: any ,
      distance: any ,distance_unit: any ,distance_value: any ,latitude: any , longitude: any , municipality: any , postal_code: any ,
      website: any ,state: any ,street: any ,street_number: any ,title: any , type: any 
     }>;
      loading: any;
      locationSearchForm: FormGroup;
  constructor(private Httpclient: HttpClient,public navCtrl: NavController,  public helperService: HelperService,public navParams: NavParams,public zone: NgZone,
    public loadingCtrl: LoadingController,private formBuilder: FormBuilder,public toastCtrl: ToastController,public searchworship :Searchworship) {

    
      this.location='';
     
      this.loading = this.loadingCtrl.create();
     // this.locationSearchForm = new FormGroup({'searchable_location': new FormControl('')});
      //this.locationSearchForm = new FormGroup({'searchable_option': new FormControl('')});

      this.locationSearchForm = this.formBuilder.group({
        searchable_location: [''],
        searchable_option: ['']
      });
      
      // this.placeCat = [
      //   { id: 1, catName: 'Church'},
      //   { id: 2, catName: 'Mosque'},
      //   { id: 3, catName: 'Buddhist Monastery'},
      //   { id: 4, catName: 'Hindu Temple'}      
      // ]; 
    
  }

 

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchWorshipPage');
    let apiname = "base64:/76e6C2AzbbxmBYuVMmtjBTDwNWXa/vrHvtTIbzVkck=";
    let api_url  = "worshipPlaceTypeList";
    let  auth_token = this.helperService.getAuth(apiname,api_url);
     let dropdown = {"auth_token" : auth_token , "version" :1 }
     console.log(dropdown);
     this.searchworship.optionlist(dropdown).subscribe((resp) => {

      // this.navCtrl.push(Myservice);
      
       console.log(resp);
      if(resp.worshipPlaceTypeList.status==1)
      {
        this.placeCat = resp.worshipPlaceTypeList.details;
      }

         }, (err) => {
     
     this.helperService.sendalertmessage('bottom',"oops..! internal error occurred!");
    });
  }
 
  findsearchresult()
  {
    if ( this.locationSearchForm.value.searchable_option == undefined)
    {
      this.helperService.sendalertmessage('bottom','please choose an option');
    } 
    else if (this.countryCode == undefined || this.countryCode == '')
     {
        this.helperService.sendalertmessage('bottom','please choose location');
     }
    else
     {
      const loading = this.loadingCtrl.create({
        content: 'Please wait...'
       });
       loading.present();
       //console.log(this.locationSearchForm.value);
      // console.log(this.mosqueLat);
     //  console.log(this.mosqueLng);   
     //  console.log(this.countryCode);
     let search_for =  this.locationSearchForm.value.searchable_option ;
     let apiname = "base64:/76e6C2AzbbxmBYuVMmtjBTDwNWXa/vrHvtTIbzVkck=";
     let api_url  = "worshipPlaceList";
     let  auth_token = this.helperService.getAuth(apiname,api_url);
     let searchparam = {"auth_token" : auth_token , "version" :1 ,"type_string" : search_for ,"radius" :"" , "latitude" :this.mosqueLat , "longitude" : this.mosqueLng }
     console.log(searchparam);
      // this.Httpclient.post('http://management.daizik.com/welcome/subscription_request/',
      // data).subscribe((res)=>{
      //    console.log(res);
      //    loading.dismiss();
      //  // this.animationForm.reset();
      //  // this.block5 = true;
      //  // this.block4 = false;

       
      //  this.navCtrl.push(SearchWorshipResultPage,{placeCatList: this.placeCat});
      //  },
      // (err) => {
      //   console.log(err);
      //   loading.dismiss();
      //   this.navCtrl.push(SearchWorshipResultPage,{placeCatList: this.placeCat});
      // });

      this.searchworship.searchlocation(searchparam).subscribe((resp) => {

        // this.navCtrl.push(Myservice);
        loading.dismiss();
         console.log(resp);
        
           if(resp.worshipPlaceList.status==0)
           {
            this.helperService.sendalertmessage('bottom',resp.worshipPlaceList.message);
           }
           else
           {
            this.navCtrl.push(SearchWorshipResultPage,{searchResultList: resp.worshipPlaceList.details});
           }
           
            

           }, (err) => {
        loading.dismiss();
       this.helperService.sendalertmessage('bottom',"oops..! internal error occurred!");
      });
       
     }
    
  }


  ionViewWillEnter(){
    let input = document.getElementById('googlePlaces').getElementsByTagName('input')[0];
    let autocomplete = new google.maps.places.Autocomplete(input, {types: ['geocode']});
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
        // retrieve the place object for your use
        let place = autocomplete.getPlace();

        console.log(place.formatted_address);
        this.mosqueLocation = place.formatted_address;
        // console.log(place.geometry.location.lat());
        // console.log(place.geometry.location.lng());
        this.mosqueLat = place.geometry.location.lat();
        this.mosqueLng = place.geometry.location.lng();

        for(let i=0; i < place.address_components.length; i++){
            // console.log(place.address_components[i]);
            for(let j=0; j < place.address_components[i].types.length; j++){
                // console.log(place.address_components[i].types[j]);
                if(place.address_components[i].types[j] == 'country'){
                    // console.log(place.address_components[i].short_name);
                    this.countryCode = place.address_components[i].short_name;
                }
            }
        }
    
    });
}
  selectSearchResult(item){
    console.log(item.description);
    this.location = item.description ;
  }
}
