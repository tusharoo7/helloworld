import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
    import { SplashScreen } from '@ionic-native/splash-screen';
    import { StatusBar } from '@ionic-native/status-bar';
    import { IonicStorageModule } from '@ionic/storage';
    import { MyApp } from './app.component';
    import { HelloionicPage } from '../pages/helloionic/helloionic';
    import {ItemDetailsPage} from '../pages/item-details/item-details';
    import { SearchWorshipPage } from '../pages/search-worship/search-worship';
    import { SearchWorshipResultPage } from '../pages/search-worship-result/search-worship-result';
    import { DonateThisChurchPage} from '../pages/donate-this-church/donate-this-church';
    import { LightCandelPage} from '../pages/light-candel/light-candel';
    import { PrayerInAChurchPage} from '../pages/prayer-in-a-church/prayer-in-a-church';
    import { HttpClientModule } from '@angular/common/http';
    import { PlacefilterPage} from '../pages/placefilter/placefilter';
    import { PlacelistmapPage } from '../pages/placelistmap/placelistmap';
    import { LoginPage } from '../pages/login/login';
    import { NativeGeocoder } from '@ionic-native/native-geocoder';
    import{RegistrationPage} from '../pages/registration/registration';
    import{TermsAndConditionPage} from '../pages/terms-and-condition/terms-and-condition';
    import{PrayerHistoryPage} from '../pages/prayer-history/prayer-history';
    import{PrivacyPolicyPage} from '../pages/privacy-policy/privacy-policy';
    import{AddWorshipPlacePage} from '../pages/add-worship-place/add-worship-place';
    import{MyAccountPage} from '../pages/my-account/my-account';
    import{PaymentHistoryPage } from '../pages/payment-history/payment-history';
    import{NointernetPage } from '../pages/nointernet/nointernet';
    import{ChangepasswordPage} from '../pages/changepassword/changepassword';
    import{AbouttusPage} from '../pages/abouttus/abouttus';
    import{ContactusPage} from '../pages/contactus/contactus';
    import{ForgotPasswordPage} from '../pages/forgot-password/forgot-password';
import { HttpModule } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Network } from '@ionic-native/network';
import { MyaccountProvider } from '../providers/myaccount/myaccount';   
import { Camera, CameraOptions } from '@ionic-native/camera';  
import { Geolocation } from '@ionic-native/geolocation';
import { PayPal } from '@ionic-native/paypal';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
@NgModule({
  declarations: [
    MyApp,
    SearchWorshipPage,
    HelloionicPage,
    ItemDetailsPage,
    SearchWorshipResultPage,
    DonateThisChurchPage,
    LightCandelPage,
    PrayerInAChurchPage,
    PlacefilterPage,
    PlacelistmapPage,
    LoginPage,
    RegistrationPage,
     ForgotPasswordPage,
     TermsAndConditionPage,
     PrayerHistoryPage,
     PrivacyPolicyPage,
     AddWorshipPlacePage,
     MyAccountPage,
     PaymentHistoryPage,
     NointernetPage,
     ChangepasswordPage,
     AbouttusPage,
     ContactusPage
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchWorshipPage,
    ItemDetailsPage,
    SearchWorshipResultPage,
    DonateThisChurchPage,
    LightCandelPage,
    PrayerInAChurchPage,
    PlacefilterPage,
    PlacelistmapPage,
    LoginPage,
    RegistrationPage,
     ForgotPasswordPage,
     TermsAndConditionPage,
     PrayerHistoryPage,
     PrivacyPolicyPage,
     AddWorshipPlacePage,
     MyAccountPage,
     PaymentHistoryPage,
     NointernetPage,
     ChangepasswordPage,
     AbouttusPage,
     ContactusPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    NativeGeocoder,
    SocialSharing,
    Network,
    Camera,
    Geolocation,
    FileTransfer,
    File,
    PayPal, 
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MyaccountProvider
  ]
})
export class AppModule {}
