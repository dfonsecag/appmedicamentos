import { Component } from '@angular/core';
import {  NavController, AlertController, Platform } from 'ionic-angular';
import { LocationsProvider } from '../../providers/locations/locations';
import { FarmaciaPage } from '../farmacia/farmacia';
import { Diagnostic } from '@ionic-native/diagnostic';



import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  map: any;
  myUbication: any;
  constructor(
    private diagnostic: Diagnostic,
    public platform: Platform, private alertController: AlertController,
    public geolocation: Geolocation,
    private navCtrl: NavController,
     public locations: LocationsProvider
  ) { }

  ionViewDidLoad() {
    this.checkLocation();
    // this.FarmaciasCercanas();
  }
  // Verificar gps activo
  checkLocation() {
    this.platform.ready().then((readySource) => {

      this.diagnostic.isLocationEnabled().then(
        (isAvailable) => {
          if (isAvailable == false) {
            let alert = this.alertController.create({
              title: 'GPS desconectado',
              subTitle: 'Active el GPS de su dispositivo.',
              buttons: ['ok']
            });
            alert.present();
          }
          else{
             this.FarmaciasCercanas();
          }
        }).catch((e) => {
          console.log(e);
          alert(JSON.stringify(e));
        });


    });
  }

  FarmaciasCercanas(){
    this.locations.load()
    .then(data => {
      this.Ubication(data);
      
    });
  }
Ubication(data){
 this.geolocation.getCurrentPosition()
      .then(response => {
        this.loadMap(data, response);
      })
      .catch(error => {
        console.log(error);
      })
}

  loadMap(markers, ubication) {
    console.log(markers);

    let latitude = ubication.coords.latitude;
    let longitude = ubication.coords.longitude;

    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map2');

    // create LatLng object
    let myLatLng = { lat: latitude, lng: longitude };
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
    // Muestra el punto del mapa en la ubicacion actual de usuario
       google.maps.event.addListenerOnce(this.map, 'idle', () => {
         new google.maps.Marker({
          position: myLatLng,
          map: this.map,
          label: 'Yo',
        });
        mapEle.classList.add('show-map');
      });

    markers.forEach(marker => {
      console.log(marker.distance);
      // if(marker.distance!="0.00"){
      let latitud = parseFloat(marker.latitud);
    let longitud = parseFloat(marker.longitud);
    let title = marker.nombre;
    let idFarmacia = marker.id;
    // create LatLng object
    let myLatLng = { lat: latitud, lng: longitud };
      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        let marker = new google.maps.Marker({
          position: myLatLng,
          map: this.map,
          title: title,
          id: idFarmacia
        });
          marker.addListener('click', (event) => {
        this.page(marker.id);
      });
        mapEle.classList.add('show-map');
      });
    // }
    });
  }
  page(id) {
    this.navCtrl.push(FarmaciaPage,{id: id})
  }
 

}
