import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationsProvider } from '../../providers/locations/locations';
import { FarmaciaProductoPage } from '../farmacia-producto/farmacia-producto';


import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  MarkerOptions
} from '@ionic-native/google-maps';
declare var google;

/**
 * Generated class for the FarmaciasCercanasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-farmacias-cercanas',
  templateUrl: 'farmacias-cercanas.html',
})
export class FarmaciasCercanasPage {
  public idProducto;
  public nombreProducto;
  public list: any;

  map: any;
  myUbication: any;
  constructor(
    public geolocation: Geolocation,
    private navCtrl: NavController,
    public locations: LocationsProvider,
    public navParams: NavParams
  ) {
    this.idProducto = navParams.get("id");
    this.nombreProducto = navParams.get("nombre");
  }

  ionViewDidLoad() {
    this.loadFarmaciasCercanas();

  }
  loadFarmaciasCercanas() {
    this.locations.FarmaciasCercanas(this.idProducto)
      .then(data => {
        this.Ubication(data);
      });
  }
  Ubication(data) {
    this.geolocation.getCurrentPosition()
      .then(response => {
        this.loadMap(data, response);
      })
      .catch(error => {
        console.log(error);
      })
  }

  loadMap(markers, ubication) {


    let latitude = ubication.coords.latitude;
    let longitude = ubication.coords.longitude;

    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map3');

    // create LatLng object
    let myLatLng = { lat: latitude, lng: longitude };
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
    // Muestra el punto del mapa en la ubicacion actual de usuario
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Aquí estoy yo'
      });
      mapEle.classList.add('show-map');
    });

    markers.forEach(marker => {

      let latitud = parseFloat(marker.latitud);
      let longitud = parseFloat(marker.longitud);
      let title = marker.nombre;
      let idProducto = marker.id;
      // create LatLng object
      let myLatLng = { lat: latitud, lng: longitud };
      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        let marker = new google.maps.Marker({
          position: myLatLng,
          map: this.map,
          title: title,
          idProducto: idProducto,
        });
        marker.addListener('click', (event) => {
          this.page(idProducto);
        });
        mapEle.classList.add('show-map');
      });
    });
  }
  page(id) {
    this.navCtrl.push(FarmaciaProductoPage, { id: id })
  }


}
