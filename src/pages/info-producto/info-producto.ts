import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { DireccionesProvider } from '../../providers/direcciones/direcciones';
import { FarmaciasCercanasPage } from '../farmacias-cercanas/farmacias-cercanas';

/**
 * Generated class for the InfoProductoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-info-producto',
  templateUrl: 'info-producto.html',
})
export class InfoProductoPage {
  public idProducto;
  public list: any;
  public planPaciente: any;
  constructor(platform: Platform, public navCtrl: NavController, public navParams: NavParams, private infoProducto: DireccionesProvider) {
    this.idProducto = navParams.get("id");
  }


  ionViewDidLoad() {
    this.loadInfoProducto();

  }
  //Obtiene la informacion de un produccto determinado
  loadInfoProducto() {
    this.infoProducto.getInfoProducto(this.idProducto)
      .then(data => {
        this.list = data;
        console.log(this.list);
      });
  }
  // Metodo para enviar a ventana Farmacias Cercanas que tengan ese producto
  FarmaciaProducto(id, nombre) {
    this.navCtrl.push(FarmaciasCercanasPage, { id: id, nombre: nombre })
  }
  // Obtiene la informacion del plan paciente si un producto lo tiene
  infoPlanpaciente(id) {
    console.log(id);
    this.infoProducto.getInfoPlanPaciente(id)
      .then(data => {
        this.planPaciente = data;
      });
  }

  Atras() {
    this.navCtrl.pop();
  }

}
