import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { MapPage } from '../map/map';
import { ProductoPage } from '../producto/producto';
import { Network } from '@ionic-native/network';


/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(private alertController: AlertController, private network: Network, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.network.onConnect().subscribe(data => {
      console.log(data)
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));

    this.network.onDisconnect().subscribe(data => {
      console.log(data)
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
  }
  // mostrar el estado de conexion
  displayNetworkUpdate(connectionState: string) {
    let networkType = this.network.type
    if (connectionState == 'offline') {
      let alert = this.alertController.create({
        title: 'Internet desconectado',
        subTitle: 'Active el Internet de su dispositivo.',
        buttons: ['ok']
      });
      alert.present();
    }
    else
      console.log('conectado')
  }
  
  // pasa a la pagina de farmacias cercanas
  FarmaciaCercanas() {
    this.navCtrl.push(MapPage)
  }
  // pasa a la pagina de farmacias cercanas
  Productos() {
    this.navCtrl.push(ProductoPage)
  }

}
