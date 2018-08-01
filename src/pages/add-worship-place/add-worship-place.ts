import { Component, Input, ViewChild } from '@angular/core';
import {ToastController, IonicPage, NavController, NavParams ,ActionSheetController,LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';


import { ApiService } from '../../services/api/api.service';
import { Searchworship } from '../search-worship/searchworship.service';
import { HelperService } from '../../services/helper/helper.service';
import { Myaccount } from '../my-account/myaccount.service'
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Constants } from "../../services/constants";
const API_BASE_URL = Constants.API_BASE_URL;
/**
 * Generated class for the AddWorshipPlacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-add-worship-place',
  templateUrl: 'add-worship-place.html',
  providers: [HelperService,ApiService,Searchworship,Myaccount]
})
export class AddWorshipPlacePage {
 @ViewChild('input') myInput ;

  userData: any;

  placeInfo: any;
  placeCat: any;

  isImageSelected: any;
  isGoogleAutoCompleteSelected: any;

  fileTransfer: FileTransferObject = this.transfer.create();
  file_name: any;
  mime: any;

  constructor(public myaccountmervice : Myaccount ,public toastCtrl: ToastController, private transfer: FileTransfer, private file: File,public loadingCtrl: LoadingController, public helperService : HelperService ,private geolocation: Geolocation, public searchworship : Searchworship ,public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, public navParams: NavParams,private camera: Camera) {
  	this.placeInfo = {
  		image: '',
  		location: '',
  		name: '', 
      type: '', 		
  		phone: '',
  		website: '',
  		streetnumber: '',
  		street: '',
  		city: '',
  		region: '',
  		province: '',
  		state: '',
      postalcode: '',
      country: '',
      country_code: '',
      place_latitude: '',
      place_longitude: ''      
  	}
    this.userData = JSON.parse(localStorage.getItem('userDetails'));
    this.isImageSelected = false;
    this.isGoogleAutoCompleteSelected = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddWorshipPlacePage');
  }

    /* Function name: initiateGoogleAutocomplete()
Description: This function to initiate google autocomplete feature
========================== start ================================ */
  initiateGoogleAutocomplete(){
  	let input = document.getElementById('addPlacesGooglePlaces').getElementsByTagName('input')[0];
    let autocomplete = new google.maps.places.Autocomplete(input, {types: ['geocode']});
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
       
	    let place = autocomplete.getPlace();
	    this.placeInfo.location = input.value;
	       
	    console.log(place.address_components);


	    for (let i = 0; i < place.address_components.length; i++) { 
	    	//console.log(place.address_components[i].types[0]);

	    	if(place.address_components[i].types[0] == 'administrative_area_level_1'){
	    		this.placeInfo.state = place.address_components[i].long_name;
	    	}else if(place.address_components[i].types[0] == 'administrative_area_level_2'){
	    		this.placeInfo.province = place.address_components[i].long_name;
	    		this.placeInfo.city = place.address_components[i].long_name;
	    	}else if(place.address_components[i].types[0] == 'locality'){
	    		this.placeInfo.region = place.address_components[i].long_name + " Municipal Corporation";
	    	}else if(place.address_components[i].types[0] == 'route'){
	    		this.placeInfo.street = place.address_components[i].long_name;
	    	}else if(place.address_components[i].types[0] == 'postal_code'){
	    		this.placeInfo.postalcode = place.address_components[i].long_name;
	    	}else if(place.address_components[i].types[0] == 'street_number'){
	    		this.placeInfo.streetnumber = place.address_components[i].long_name;
	    	}else if(place.address_components[i].types[0] == 'country'){
	    		this.placeInfo.country = place.address_components[i].long_name;
          this.placeInfo.country_code = place.address_components[i].short_name;
	    	}
        
        this.placeInfo.place_latitude = place.geometry.location.lat();
        this.placeInfo.place_longitude = place.geometry.location.lng();

		}
    
    this.isGoogleAutoCompleteSelected = true;  
    });
  }
  /*============== loadWorshipPlaceCategory() end ===================*/

   /* Function name: checkIsSuggestionSelected()
Description: This function to clear google autocomplete textbox if user does not choose location from google auto suggest
========================== start ================================ */
  checkIsSuggestionSelected(){
    if(!this.isGoogleAutoCompleteSelected){
      this.placeInfo.location = '';
    }
  }
/*============== checkIsSuggestionSelected() end ===================*/

 clearGoogleAutocomplete(){
      this.isGoogleAutoCompleteSelected = false;
      this.placeInfo.location = '';
      setTimeout(() => {
        this.myInput.setFocus();
      },150);
    }

  presentActionSheet()
  {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose image source',
      buttons: [
        {
          text: 'Gallery',
          role: 'destructive',
          icon: 'image',            
          handler: () => {
            const options: CameraOptions = {
              quality: 100,
              destinationType: this.camera.DestinationType.FILE_URI,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE,
              sourceType: 0,
              correctOrientation: true,
              targetWidth:300,
              targetHeight:300,
              allowEdit: true
            };
            this.camera.getPicture(options).then((imageData) => {               
              
              let b = imageData.substr(imageData.lastIndexOf('/') + 1);

              b = b.toString().split('?');
              this.file_name = b[0];

              this.placeInfo.image = imageData;
              this.isImageSelected = true;

              let a = imageData.substr(imageData.lastIndexOf('.') + 1);

              let res = a.toString().split('?');
              /*console.log("Ultimate "+a);
              console.log("Extention "+res[0]);*/

              if (res[0] == "jpeg") {
                this.mime = "image/jpeg";
              }
              else if (res[0] == "jpg") {
                this.mime = "image/jpg";
              }
              else {
                this.mime = "image/png";
              }                

              
            }, (err) => {
              //console.log(err);
            });
          }
        },{
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            const options:CameraOptions = {
              quality: 100,
              destinationType: this.camera.DestinationType.FILE_URI,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE,
              sourceType: 1,
              correctOrientation: true,
              targetWidth:300,
              targetHeight:300,
              cameraDirection:1,
              allowEdit:true
            };
            this.camera.getPicture(options).then((imageData) => {
              
              this.file_name = imageData.substr(imageData.lastIndexOf('/') + 1);

              this.placeInfo.image = imageData;
              this.isImageSelected = true;

              //console.log(imageData.substr(imageData.lastIndexOf('.') + 1));

              if (imageData.substr(imageData.lastIndexOf('.') + 1) == "jpeg") {
                this.mime = "image/jpeg";
              }
              else if (imageData.substr(imageData.lastIndexOf('.') + 1) == "jpg") {
                this.mime = "image/jpg";
              }
              else {
                this.mime = "image/png";
              }

            }, (err) => {
              //console.log(err);
            });
          }
        },{
          text: 'Cancel',
          icon: 'close-circle',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  ionViewWillEnter(){    
  	this.initiateGoogleAutocomplete();
    if(localStorage.getItem('xsrf_token')!=null){
      this.loadWorshipPlaceCategory();
    }
  }

  loadWorshipPlaceCategory()
  {
    

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

  addWorshipPlace(){
  	
    //console.log(this.placeInfo);

    if(this.placeInfo.name!=''  &&  this.placeInfo.type!=''  &&  this.placeInfo.state!=''  &&  this.placeInfo.postalcode!=''  &&  this.placeInfo.location!=''){

      if(this.isGoogleAutoCompleteSelected == true){
         if(this.isImageSelected == true){
            this.addWorshipPlaceWithImage();
          }else if(this.isImageSelected == false){
            this.addWorshipPlaceWithoutImage();
          }
        }else{
          this.helperService.sendalertmessage('bottom',"Please choose location from suggestion!");
        }
     
    }else{
     this.helperService.sendalertmessage('bottom',"All * marked fields are mandatory!");
    }       
  }


   /* Function name: addWorshipPlaceWithImage()
Description: This function to add place with image
========================== start ================================ */
  addWorshipPlaceWithImage(){
    const loader = this.loadingCtrl.create({
      content: "Please wait..."      
    });
    loader.present();

    this.geolocation.getCurrentPosition().then((resp) => {    
      

       let apiname = "base64:/76e6C2AzbbxmBYuVMmtjBTDwNWXa/vrHvtTIbzVkck=";
       let api_url  = "suggestWorshipPlace";
       let  gethashval = this.helperService.getAuth(apiname,api_url);

      

      let options: FileUploadOptions = {
        fileKey: 'image',
        fileName: this.file_name,
        mimeType: this.mime,
        params: {
          auth_token: gethashval,
          version: '1',
          user_id:  localStorage.getItem('user_id'),
          title: this.placeInfo.name,
          type: this.placeInfo.type,
          description: '',          
          contact_number: this.placeInfo.phone,
          website: this.placeInfo.website,
          street_number: this.placeInfo.streetnumber,
          street: this.placeInfo.street,
          city: this.placeInfo.city,
          municipality: this.placeInfo.region,
          district: this.placeInfo.province,
          postal_code: this.placeInfo.postalcode,
          state: this.placeInfo.state,
          country_code: this.placeInfo.country_code,
          country: this.placeInfo.country,
          place_latitude: this.placeInfo.place_latitude,
          place_longitude: this.placeInfo.place_longitude,
          latitude: resp.coords.latitude,
          longitude: resp.coords.longitude
        }, headers: {          
          "xsrf-token": localStorage.getItem("xsrf_token")
        }

      }
     
      
      //console.log(this.placeInfo.image.substring(7));

      let a = this.placeInfo.image.substring(7).toString().split("?");
      //console.log(a[0]);

      this.fileTransfer.upload(a[0], API_BASE_URL + "/" +'suggestWorshipPlace', options)
      .then((data) => {

        loader.dismiss();
        let response = JSON.parse( data.response );        

        if(response.suggestWorshipPlace.status == 1){

          this.helperService.sendalertmessage('bottom',response.suggestWorshipPlace.message);
          this.navCtrl.pop();
          // toast.onDidDismiss(() => {
          //   this.navCtrl.pop();
          // });

        }else if(response.suggestWorshipPlace.status == 0){

          let toast = this.toastCtrl.create({
             message: response.suggestWorshipPlace.message,
             duration: 3000,
             position: 'bottom'
          });
          toast.present();

        }         
        
      }, (err) => { 

        //console.log(err);
        loader.dismiss();  
        this.helperService.sendalertmessage('bottom',"An unknown error has occurred! Try later.");
               
       
      }) 
      
     }).catch((error) => {
       loader.dismiss();
       this.helperService.sendalertmessage('bottom',"Please enable location services on your device and set it to high accuracy for best results.");
     }); 
  }
/*============== addWorshipPlaceWithImage() end ===================*/



 /* Function name: addWorshipPlaceWithoutImage()
Description: This function to add place without image
========================== start ================================ */
  addWorshipPlaceWithoutImage(){
    const loader = this.loadingCtrl.create({
      content: "Please wait..."      
    });
    loader.present();

    this.geolocation.getCurrentPosition().then((resp) => {
      let api_name = "base64:/76e6C2AzbbxmBYuVMmtjBTDwNWXa/vrHvtTIbzVkck=";
       let api_url  = "suggestWorshipPlace";
       let  auth_token = this.helperService.getAuth(api_name,api_url);
       
      let apiInput = { 
        version:1,
        auth_token :  auth_token,       
          user_id: localStorage.getItem('user_id'),
          title: this.placeInfo.name,
          type: this.placeInfo.type,
          description: '',
          image: '',          
          contact_number: this.placeInfo.phone,
          website: this.placeInfo.website,
          street_number: this.placeInfo.streetnumber,
          street: this.placeInfo.street,
          city: this.placeInfo.city,
          municipality: this.placeInfo.region,
          district: this.placeInfo.province,
          postal_code: this.placeInfo.postalcode,
          state: this.placeInfo.state,
          country_code: this.placeInfo.country_code,
          country: this.placeInfo.country,
          place_latitude: this.placeInfo.place_latitude,
          place_longitude: this.placeInfo.place_longitude,
          latitude: resp.coords.latitude,
          longitude: resp.coords.longitude
      }

      let apiname = 'suggestWorshipPlace';
      this.myaccountmervice.addsuggestedworshipplace(apiInput).subscribe(
          data => {           
          //console.log(data);
          loader.dismiss();

          if(data.suggestWorshipPlace.status == 1){

            let toast = this.toastCtrl.create({
               message: data.suggestWorshipPlace.message,
               duration: 3000,
               position: 'bottom'
            });
            toast.present();

            toast.onDidDismiss(() => {
              this.navCtrl.pop();
            });

          }else if(data.suggestWorshipPlace.status == 0){

            let toast = this.toastCtrl.create({
               message: data.suggestWorshipPlace.message,
               duration: 3000,
               position: 'bottom'
            });
            toast.present();
          }                  
        },
        error => { 
                   
          loader.dismiss();
          this.helperService.sendalertmessage('bottom',"An unknown error has occurred! Try later.");
        });

    }).catch((error) => {
      loader.dismiss();
      this.helperService.sendalertmessage('bottom',"Please enable location services on your device and set it to high accuracy for best results.");
    });  
  }
/*============== addWorshipPlaceWithoutImage() end ===================*/
}
