import { Component } from '@angular/core';
import { MapPage } from '../map/map';
import { ProductoPage } from '../producto/producto';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MapPage;
  tab2Root = ProductoPage;

  constructor() {

  }
}
