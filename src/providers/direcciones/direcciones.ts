import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the DireccionesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DireccionesProvider {

  constructor(public http: Http) {
    console.log('Hello DireccionesProvider Provider');
  }
  // Obtiene las farmacias mas cercasnas
  load() {    
  return new Promise(resolve => {
    this.http.get('https://appmedicamentos.herokuapp.com/api/v1/farmacias_cercanas.json')
      .map(res => res.json())
       .subscribe((data:any=[]) =>{
        resolve(data);
      });
  });
}

// Obtiene la informacion de la farmacia seleecionada del market map
 getInfoFarmacia(id) {    
  return new Promise(resolve => {
    this.http.get('https://appmedicamentos.herokuapp.com/api/v1/infoFarmacia/'+id+'.json')
      .map(res => res.json())
       .subscribe((data:any=[]) =>{
        resolve(data);
      });
  });
}
// Obtiene los productos de la busqueda
 getSearchProducto(producto) {    
  return new Promise(resolve => {
    this.http.get('https://appmedicamentos.herokuapp.com/api/v1/searchProducto/'+producto+'.json')
      .map(res => res.json())
       .subscribe((data:any=[]) =>{
        resolve(data);
      });
  });
}
// Obtiene la informacion de un producto determinado
 getInfoProducto(id) {    
  return new Promise(resolve => {
    this.http.get('https://appmedicamentos.herokuapp.com/api/v1/infoProducto/'+id+'.json')
      .map(res => res.json())
       .subscribe((data:any=[]) =>{
        resolve(data);
      });
  });
}
// Obtiene la informacion de un plan paciente por id
 getInfoPlanPaciente(id) {    
  return new Promise(resolve => {
    this.http.get('https://appmedicamentos.herokuapp.com/api/v1/infoPlanPaciente/'+id+'.json')
      .map(res => res.json())
       .subscribe((data:any=[]) =>{
        resolve(data);
      });
  });
}
// Obtiene la informacion de la farmacia con un determinado producto
 getInfoFarmaciaProducto(id) {    
  return new Promise(resolve => {
    this.http.get('https://appmedicamentos.herokuapp.com/api/v1/FarmaciaProductoSearch/'+id+'.json')
      .map(res => res.json())
       .subscribe((data:any=[]) =>{
        resolve(data);
      });
  });
}
// Obtiene plan paciente de un determinado producto
 getPlanPaciente(id) {    
  return new Promise(resolve => {
    this.http.get('https://appmedicamentos.herokuapp.com/api/v1/infoProducto/'+id+'.json')
      .map(res => res.json())
       .subscribe((data:any=[]) =>{
        resolve(data);
      });
  });
}


}
