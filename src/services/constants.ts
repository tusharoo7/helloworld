export class Constants {    
  //public static get API_BASE_URL(): string { return 'http://192.168.1.1/customerapp';}
    public static get API_BASE_URL(): string { return 'https://www.demoyourprojects.com/lightcandle/public/api/v1';}
    
    public static get STORAGE_TYPE(): any { return sessionStorage; }
    //public static get LIVE_API_BASE_URL():string{ return 'http://salesapi.goaptive.com/api/';}
    public static get IMAGE_URL():string{ return '/assets/profile/';}
    public static get UPLOADED_IMG_URL(): string { return window.location.origin + ":4000/uploads/"; }
    public static get PORT():string{ return '8000';}
    public static get TOASTERLIFETIME():string{ return '3000';}
    //API URLS
    


}
