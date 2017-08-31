import { Component } from '@angular/core';
import {  NavParams } from 'ionic-angular';
import { DireccionesProvider } from '../../providers/direcciones/direcciones';
import { CallNumber } from '@ionic-native/call-number';
import { Platform } from 'ionic-angular';


/**
 * Generated class for the FarmaciaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-farmacia',
  templateUrl: 'farmacia.html',
})
export class FarmaciaPage {
  public idFarmacia;
  public list: any;

  constructor(private callNumber: CallNumber, public navParams: NavParams, public infoFarmacia: DireccionesProvider, private platform: Platform) {
    this.idFarmacia = navParams.get("id");
   
  }

  ionViewDidLoad() {
    console.log("parametro pasado de Home Page:   " + this.idFarmacia);
    this.loadDirecciones();
  }
  // Busca las farmacias mas cercanas
  loadDirecciones() {
    this.infoFarmacia.getInfoFarmacia(this.idFarmacia)
      .then(data => {
        this.list = data;
      });
  }
  // metodo para hacer una llamada del boton de la farmacia
  launchDialer(n: string) {
    this.callNumber.callNumber(n, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error llamando'));
  }
  //Metodo para abrir el waze o map para dirigirse a la farmacia
  openFilters(latitude, longitude) {
    let destination = latitude + ',' + longitude;

    if (this.platform.is('ios')) {
      console.log('soy ios: ' + destination);
      window.open('maps://?q=' + destination, '_system');
    } else {
      let label = encodeURI('My Label');
      console.log('soy android: ' + destination);
      window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
    }
  }


}
