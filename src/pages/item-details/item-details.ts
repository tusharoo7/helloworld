import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DonateThisChurchPage} from '../donate-this-church/donate-this-church';
import { LightCandelPage} from '../light-candel/light-candel';
import { PrayerInAChurchPage} from '../prayer-in-a-church/prayer-in-a-church';
import { LoginPage } from '../login/login';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
//import { Storage } from '@ionic/storage';
/**
 * Generated class for the ItemDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation. localStorage.setItem('myCat', 'Tom');
 */

@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {
  loggedIn :any;
  detailsData :any;
  placeData:any;
  constructor(private iab: InAppBrowser, public navCtrl: NavController, private socialSharing: SocialSharing,public navParams: NavParams,/*private storage: Storage*/) {
    
    this.detailsData = JSON.parse(this.navParams.get("clickedData"));
    
  }

  ionViewDidLoad() {
    console.log(this.navParams.get("clickedData"));
    console.log('ionViewDidLoad ItemDetailsPage');
  }
  light_a_candel()
  {
    this.navCtrl.push(LightCandelPage);
  }
  prayer_in_a_church()
  {

    var loggedIn = localStorage.getItem('isLoggedIn');
        if(loggedIn == undefined || loggedIn == null)
       {
          this.navCtrl.push(LoginPage);
       }
      else
      {
        this.navCtrl.push(PrayerInAChurchPage,{placeData :this.detailsData});
      }
    
  }
  donte_church()
  {
     var loggedIn = localStorage.getItem('isLoggedIn');
        if(loggedIn == undefined || loggedIn == null)
       {
          this.navCtrl.push(LoginPage);
       }
      else
      {
        this.navCtrl.push(DonateThisChurchPage ,{placeData :this.detailsData} );
      }
  }

  visitWebsite(url){
    const options: InAppBrowserOptions = {
      zoom: 'no',
      location: 'no'
    }
    // Opening a URL and returning an InAppBrowserObject
    const browser = this.iab.create(url, '_blank', options);
  }

  sharePlace(){
  	let placeName = this.detailsData.worship_type+" Name:- "+this.detailsData.title;
  	let placeAddress = "Address:- "+this.detailsData.address;
    let placePhone = '', placeWebsite = '';

    if(this.detailsData.contact_number!=''){
  	  placePhone = "Phone:- "+this.detailsData.contact_number;
    }
    if(this.detailsData.website!=''){
      placeWebsite = "Website:- "+this.detailsData.website;
    }
  	
    let subject = "Light A Candle";
  	this.socialSharing.share(placeName+"\n"+placeAddress+"\n"+placePhone+"\n", subject, '', placeWebsite).then(() => {	  
  	}).catch(() => {	  
  	});
  }

  pointPlaceInGoogleMap()
  {
    // this.navCtrl.push(IndividualplacemapPage,{
  	// 	placeData: this.detailsData
  	// });
  }
}
