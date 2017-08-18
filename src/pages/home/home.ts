import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
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

  constructor(private toast: ToastController, private network: Network, public navCtrl: NavController, public navParams: NavParams) {
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
   this.network.type
    if (connectionState == 'offline') {
      this.toast.create({
        message: `Active el Internet y GPS de su dispositivo`,
        duration: 5000
      }).present();
    }
    else
      console.log('conectado')
  }

  // pasa a la pagina de farmacias cercanas
  FarmaciaCercanas() {
    this.navCtrl.setRoot(MapPage)
  }
  // pasa a la pagina de farmacias cercanas
  Productos() {
    this.navCtrl.setRoot(ProductoPage)
  }

}
