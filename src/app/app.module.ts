import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { CallNumber } from '@ionic-native/call-number';


import { TabsPage } from '../pages/tabs/tabs';
import { MapPage } from '../pages/map/map';
import { FarmaciaPage } from '../pages/farmacia/farmacia';
import { ProductoPage } from '../pages/producto/producto';
import { InfoProductoPage } from '../pages/info-producto/info-producto';
import { FarmaciasCercanasPage } from '../pages/farmacias-cercanas/farmacias-cercanas';
import { FarmaciaProductoPage } from '../pages/farmacia-producto/farmacia-producto';

import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { GoogleMapsProvider} from '../providers/google-maps/google-maps';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DireccionesProvider } from '../providers/direcciones/direcciones';
import { LocationsProvider } from '../providers/locations/locations';
import { IonicPageModule } from 'ionic-angular';





@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    MapPage,
    FarmaciaPage,
    FarmaciasCercanasPage,
    ProductoPage,
    InfoProductoPage,
    FarmaciaProductoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    MapPage,
    FarmaciaPage,
    FarmaciasCercanasPage,
    ProductoPage,
    InfoProductoPage,
    FarmaciaProductoPage

  ],
  providers: [

    StatusBar,
    SplashScreen,
    Geolocation,
    GoogleMaps,
    GoogleMapsProvider,
    CallNumber,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DireccionesProvider,
    LocationsProvider
  ]
})
export class AppModule { }
