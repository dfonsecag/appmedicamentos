import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';


/*
  Generated class for the LocationsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LocationsProvider {
  data: any;
  constructor(public http: Http, public geolocation: Geolocation) {
    console.log('Hello LocationsProvider Provider');
  }
  load() {
    return new Promise(resolve => {

      this.http.get('https://appmedicamentos.herokuapp.com/api/v1/farmacias_cercanas.json')
        .map(res => res.json())
        .subscribe(data => {

          this.data = this.applyHaversine(data);

          resolve(this.data);
        });

    });

  }
  FarmaciasCercanas(id) {
    return new Promise(resolve => {

      this.http.get('https://appmedicamentos.herokuapp.com/api/v1/FarmaciasCercanaSearch/'+id+'.json')
        .map(res => res.json())
        .subscribe(data => {
          this.data = this.applyHaversine(data);
          resolve(this.data);
        });

    });

  }
    applyHaversine(locations) {
      
    this.geolocation.getCurrentPosition().then(res => {
      let usersLocation = {
        lat: res.coords.latitude, 
        lng: res.coords.longitude
      };

      locations.map((location) => {

        let placeLocation = {
          lat: location.latitud,
          lng: location.longitud,
          
        };

         location.distance = this.getDistanceFromLatLonInKm(
        placeLocation.lat,
        placeLocation.lng,
        usersLocation.lat,
        usersLocation.lng
      ).toFixed(2);
    }); 

    // console.log(locations); // This will now have your updated distances

    }).catch((error) => {
      console.log('Error getting location', error);
    });

    return locations; // this will not work because the code above is asynchronous
  }

   getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = this.deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  if(d>=20)
    d = 0;
  return d;
}

 deg2rad(deg) {
  return deg * (Math.PI / 180)
}

}
