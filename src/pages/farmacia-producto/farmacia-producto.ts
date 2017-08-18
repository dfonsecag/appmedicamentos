import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DireccionesProvider } from '../../providers/direcciones/direcciones';
import { CallNumber } from '@ionic-native/call-number';
import { Platform } from 'ionic-angular';


/**
 * Generated class for the FarmaciaProductoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-farmacia-producto',
  templateUrl: 'farmacia-producto.html',
})
export class FarmaciaProductoPage {
  public idProducto;
  public list: any;

  constructor(private platform: Platform, private callNumber: CallNumber, public navCtrl: NavController, public navParams: NavParams, private infoFarmaciaProducto: DireccionesProvider) {
    this.idProducto = navParams.get("id");
    
     platform.ready().then(() => {
      platform.registerBackButtonAction(() => this.anteriorPage());
    })
  }

  ionViewDidLoad() {
    this.loadInfoProducto();
  }
  //Obtiene la informacion de un produccto determinado
  loadInfoProducto() {
    this.infoFarmaciaProducto.getInfoFarmaciaProducto(this.idProducto)
      .then(data => {
        this.list = data;
        console.log(this.list);
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
   anteriorPage() {
    this.navCtrl.pop();
  }
}
