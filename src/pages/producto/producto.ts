import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { DireccionesProvider } from '../../providers/direcciones/direcciones';
import { InfoProductoPage } from '../info-producto/info-producto';

/**
 * Generated class for the ProductoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {

  public list: any;

  constructor(platform: Platform, private alertController: AlertController, public navCtrl: NavController, public navParams: NavParams, public infoFarmacia: DireccionesProvider) {
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductoPage');
  }
  // hace el submit de la vista para buscar el  producto
  onSubmit(formData) {
    if (formData.valid) {
      this.infoFarmacia.getSearchProducto(formData.value.producto)
        .then(data => {
          this.verificarList(data);
        });

    }
  }
  verificarList(data) {
    if (data == '') {
      let alert = this.alertController.create({
        title: 'No se encuentra coincidencia',
        subTitle: 'Intente con otra palabra',
        buttons: ['ok']
      });
      alert.present();
    }
    else
      this.list = data;
  }
  // pasa a la pagina de informacion de producto con el parametro
  itemSelected(id) {
    this.navCtrl.setRoot(InfoProductoPage, { id: id })
  }

}
