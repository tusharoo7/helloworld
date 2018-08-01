
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform ,Events  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SearchWorshipPage } from '../pages/search-worship/search-worship';
import { LoginPage } from '../pages/login/login';

import{TermsAndConditionPage} from '../pages/terms-and-condition/terms-and-condition';
import{PrayerHistoryPage} from '../pages/prayer-history/prayer-history';
import{PrivacyPolicyPage} from '../pages/privacy-policy/privacy-policy';
import{AddWorshipPlacePage} from '../pages/add-worship-place/add-worship-place';
import{MyAccountPage} from '../pages/my-account/my-account';
import{PaymentHistoryPage } from '../pages/payment-history/payment-history';
import{NointernetPage } from '../pages/nointernet/nointernet';
import{AbouttusPage} from '../pages/abouttus/abouttus';
    import{ContactusPage} from '../pages/contactus/contactus';
import { ApiService } from '../services/api/api.service';
import { GlobalService } from './global.service';
import {Md5} from 'ts-md5/dist/md5';
import { Network } from '@ionic-native/network';
@Component({
  templateUrl: 'app.html',
  providers: [GlobalService,ApiService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  loggedIn :any;
  rootPage: any = SearchWorshipPage;

  pages: Array<{title: string, component: any}>;

  constructor(public events: Events,private network: Network, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public globalService :GlobalService ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    var loggedIn = localStorage.getItem('isLoggedIn');
        if(loggedIn == undefined || loggedIn == null)
       {
        this.pages = [
          {title: 'Home' , component:SearchWorshipPage},
           { title: 'Terms & Condition', component: TermsAndConditionPage },
          { title: 'Privacy Policy', component: PrivacyPolicyPage },
          { title: 'Login', component: LoginPage },
          { title: 'About Us', component: AbouttusPage },
          { title: 'Contact Us', component: ContactusPage }
        ];
       }
      else
      {
        this.pages = [
          {title: 'Home' , component:SearchWorshipPage},
          {title: 'My Account' , component:MyAccountPage},
          {title: 'Add Worship pLace' , component:AddWorshipPlacePage},
          { title: 'Prayer History', component: PrayerHistoryPage },
          { title: 'Payment History', component: PaymentHistoryPage },
          { title: 'Terms & Condition', component: TermsAndConditionPage },
          { title: 'Privacy Policy', component: PrivacyPolicyPage },
          { title: 'About Us', component: AbouttusPage },
          { title: 'Contact Us', component: ContactusPage },
          { title: 'Logout', component: null }
        ];
      }
    
    events.subscribe('loggedinsucessfull', (status, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('Welcome :-', status, 'at', time);
      this.loggedIn = localStorage.getItem('isLoggedIn');
      if(this.loggedIn == 1)
      {
        this.pages = [
          {title: 'Home' , component:SearchWorshipPage},
          {title: 'My Account' , component:MyAccountPage},
          {title: 'Add Worship pLace' , component:AddWorshipPlacePage},
          { title: 'Prayer History', component: PrayerHistoryPage },
          { title: 'Payment History', component: PaymentHistoryPage },
          { title: 'Terms & Condition', component: TermsAndConditionPage },
          { title: 'Privacy Policy', component: PrivacyPolicyPage },
          
          { title: 'Logout', component: null }
        ];
      }
     

    });

    events.subscribe('logged_out_sucessfull', (status, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
    //  console.log('Welcome :-', status, 'at', time);

      this.pages = [
        {title: 'Home' , component:SearchWorshipPage},
         { title: 'Terms & Condition', component: TermsAndConditionPage },
        { title: 'Privacy Policy', component: PrivacyPolicyPage },
        { title: 'Login', component: LoginPage },
        
      ];

    });

    

  }


  
  initializeApp() {
    
    
    this.platform.ready().then(() => {
        // watch network for a disconnect
    //   let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    //         console.log('network was disconnected :-(');
            
    //         this.nav.setRoot(NointernetPage);  
    //     });
    // // stop disconnect watch
    //  disconnectSubscription.unsubscribe();
    //  // watch network for a connection
    //  let connectSubscription = this.network.onConnect().subscribe(() => {
    //   console.log('network connected!');
    //   this.nav.setRoot(SearchWorshipPage);  
    //   setTimeout(() => {
    //     if (this.network.type === 'wifi') {
    //       console.log('we got a wifi connection, woohoo!');
    //     }
    //   }, 3000);
    // });

// stop connect watch
//connectSubscription.unsubscribe();




      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (localStorage.getItem("xsrf_token") == null) {
        //...
      //  console.log("f-time")  ;
        let apiname = "base64:/76e6C2AzbbxmBYuVMmtjBTDwNWXa/vrHvtTIbzVkck=";
        let gethashval:any= this.getAuth(apiname);
        
        let access_request_key = '$2y$10$4qBz4X9gLMlhcHmqwLbtje2JP6jSfwDuHCN.5i2zNJJuw44Y5kmmi';
        let user_authentication_param = {"access_request_key" :access_request_key ,"auth_token":gethashval}
       // console.log(gethashval) ;
       // console.log("f-time")  ;

        this.globalService.check_first_time(user_authentication_param).subscribe((resp) => {
          
         if(resp.generateApiAccessKey.status==1)
         {
          
          //console.log(resp.generateApiAccessKey.details.xsrf_token);
           localStorage.setItem('xsrf_token', resp.generateApiAccessKey.details.xsrf_token);
          // console.log(localStorage.getItem('xsrf_token'));
         } 
         // console.log(resp)  ;
            }, (err) => {
        //  loading.dismiss();
                
        });


      }
      else
      {
        console.log("not f-time")  ;
      }

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
   // console.log("hi"+ page.component);
    if( page.component!=null && page.component!=undefined && page.component!='' )
    {
      //console.log("hello");
      if(page.component==SearchWorshipPage)
      {

        this.nav.setRoot(page.component);
      }
      else
      {
        this.nav.push(page.component);
      }

      
    }
    else
    {
      let xsrf_token = localStorage.getItem('xsrf_token');
      localStorage.clear();
      localStorage.setItem('xsrf_token', xsrf_token);  
      sessionStorage.clear();
      this.events.publish('logged_out_sucessfull', 'logout', Date.now());
      this.nav.setRoot(SearchWorshipPage);
      //console.log(" uio  hello");
    }
  }

  getAuth(apiname)
  {
    let api_url = "generateApiAccessKey";
    let enc_key = Md5.hashStr(apiname+api_url);
    return enc_key;
  }
  

}

