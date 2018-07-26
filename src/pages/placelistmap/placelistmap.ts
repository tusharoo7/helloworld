import { ViewChild, ElementRef } from '@angular/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare var google;

/**
 * Generated class for the PlacelistmapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-placelistmap',
  templateUrl: 'placelistmap.html',
})
export class PlacelistmapPage {
  @ViewChild('map') mapElement: ElementRef;
  placeData:any;  
  map: any;
  marker: any;


constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.placeData  = [
    { catName: 'Church', name: 'St. Paul\'s Cathedral', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/St_Pauls_Cathedral_from_West_adj.JPG/280px-St_Pauls_Cathedral_from_West_adj.JPG', address: 'Kolkata, West Bengal 700071', latitude: '22.5915141', longitude: '88.3977665',phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
    { catName: 'Mosque', name: 'St. Paul\'s Cathedral', image: '', address: 'Kolkata, West Bengal 700071', latitude: '22.597383', longitude: '88.419259', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
    { catName: 'Church', name: 'St. Paul\'s Cathedral', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/St_Pauls_Cathedral_from_West_adj.JPG/280px-St_Pauls_Cathedral_from_West_adj.JPG', address: 'Kolkata, West Bengal 700071', latitude: '22.5855474', longitude: '88.4192279', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
    { catName: 'Hindu Temple', name: 'St. Paul\'s Cathedral', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/St_Pauls_Cathedral_from_West_adj.JPG/280px-St_Pauls_Cathedral_from_West_adj.JPG', address: 'Kolkata, West Bengal 700071', latitude: '22.575223', longitude: '88.431694', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
    { catName: 'Buddhist Monastery', name: 'St. Paul\'s Cathedral', image: '', address: 'Kolkata, West Bengal 700071', latitude: '22.5685979', longitude: '88.4308607', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
    { catName: 'Hindu Temple', name: 'St. Paul\'s Cathedral', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/St_Pauls_Cathedral_from_West_adj.JPG/280px-St_Pauls_Cathedral_from_West_adj.JPG', address: 'Kolkata, West Bengal 700071', latitude: '22.5686855', longitude: '88.4294103', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
    { catName: 'Mosque', name: 'St. Paul\'s Cathedral', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/St_Pauls_Cathedral_from_West_adj.JPG/280px-St_Pauls_Cathedral_from_West_adj.JPG', address: 'Kolkata, West Bengal 700071', latitude: '22.5735314', longitude: '88.4309249', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
    { catName: 'Church', name: 'St. Paul\'s Cathedral', image: '', address: 'Kolkata, West Bengal 700071', latitude: '22.5867', longitude: '88.4171', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
    { catName: 'Hindu Temple', name: 'St. Paul\'s Cathedral', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/St_Pauls_Cathedral_from_West_adj.JPG/280px-St_Pauls_Cathedral_from_West_adj.JPG', address: 'Kolkata, West Bengal 700071', latitude: '22.5867', longitude: '88.4171', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
    { catName: 'Buddhist Monastery', name: 'St. Paul\'s Cathedral', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/St_Pauls_Cathedral_from_West_adj.JPG/280px-St_Pauls_Cathedral_from_West_adj.JPG', address: 'Kolkata, West Bengal 700071', latitude: '22.5867', longitude: '88.4171', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
    { catName: 'Buddhist Monastery', name: 'St. Paul\'s Cathedral', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/St_Pauls_Cathedral_from_West_adj.JPG/280px-St_Pauls_Cathedral_from_West_adj.JPG', address: 'Kolkata, West Bengal 700071', latitude: '22.5867', longitude: '88.4171', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
    { catName: 'Mosque', name: 'St. Paul\'s Cathedral', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/St_Pauls_Cathedral_from_West_adj.JPG/280px-St_Pauls_Cathedral_from_West_adj.JPG', address: 'Kolkata, West Bengal 700071', latitude: '22.5867', longitude: '88.4171', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
    { catName: 'Hindu Temple', name: 'St. Paul\'s Cathedral', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/St_Pauls_Cathedral_from_West_adj.JPG/280px-St_Pauls_Cathedral_from_West_adj.JPG', address: 'Kolkata, West Bengal 700071', latitude: '22.5867', longitude: '88.4171', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
    { catName: 'Buddhist Monastery', name: 'St. Paul\'s Cathedral', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/St_Pauls_Cathedral_from_West_adj.JPG/280px-St_Pauls_Cathedral_from_West_adj.JPG', address: 'Kolkata, West Bengal 700071', latitude: '22.5867', longitude: '88.4171', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
    { catName: 'Church', name: 'St. Paul\'s Cathedral', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/St_Pauls_Cathedral_from_West_adj.JPG/280px-St_Pauls_Cathedral_from_West_adj.JPG', address: 'Kolkata, West Bengal 700071', latitude: '22.5867', longitude: '88.4171', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
    { catName: 'Hindu Temple', name: 'St. Paul\'s Cathedral', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/St_Pauls_Cathedral_from_West_adj.JPG/280px-St_Pauls_Cathedral_from_West_adj.JPG', address: 'Kolkata, West Bengal 700071', latitude: '22.5867', longitude: '88.4171', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
  ]; //this is to get the place information from previous page
}

ionViewDidLoad(){
  this.pointToGoogleMap();
}

/* Function name: pointToGoogleMap()
Description: This function to create the google map 
========================== start ================================ */
pointToGoogleMap(){
  let lat = this.placeData[0].latitude;
  let lng = this.placeData[0].longitude; 	
   let latLng = new google.maps.LatLng(lat, lng);   
  let mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  this.addMarker(); 
}
/*============== pointToGoogleMap() end ===================*/


/* Function name: addMarker()
Description: This function to drop the marker on map for multiple places
========================== start ================================ */
addMarker(){
  for (var i = 0; i < this.placeData.length; i++) {	    
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.placeData[i].latitude, this.placeData[i].longitude),
      map: this.map,
      draggable: false,
      animation: google.maps.Animation.DROP	      
    });	    
    var infowindow = new google.maps.InfoWindow();
    infowindow.setContent(this.placeData[i].name);
    let content = "<h4>"+this.placeData[i].name+"</h4>";
    this.addInfoWindow(marker, content);	          
}
}
/*============== addMarker() end ===================*/


/* Function name: addInfoWindow()
Description: This function to bind the information window with the marker
========================== start ================================ */
addInfoWindow(marker, content){ 
  let infoWindow = new google.maps.InfoWindow({
    content: content
  });   
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });   
}
/*============== addInfoWindow() end ===================*/
}
