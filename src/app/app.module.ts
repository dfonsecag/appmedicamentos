import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { CallNumber } from '@ionic-native/call-number';
import { Diagnostic } from '@ionic-native/diagnostic';

import { MapPage } from '../pages/map/map';
import { FarmaciaPage } from '../pages/farmacia/farmacia';
import { ProductoPage } from '../pages/producto/producto';
import { InfoProductoPage } from '../pages/info-producto/info-producto';
import { FarmaciasCercanasPage } from '../pages/farmacias-cercanas/farmacias-cercanas';
import { FarmaciaProductoPage } from '../pages/farmacia-producto/farmacia-producto';
import { HomePage } from '../pages/home/home';

import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { GoogleMapsProvider} from '../providers/google-maps/google-maps';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DireccionesProvider } from '../providers/direcciones/direcciones';
import { LocationsProvider } from '../providers/locations/locations';

import { Network } from '@ionic-native/network';




@NgModule({
  declarations: [
    MyApp,
    MapPage,
    FarmaciaPage,
    FarmaciasCercanasPage,
    ProductoPage,
    InfoProductoPage,
    FarmaciaProductoPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    FarmaciaPage,
    FarmaciasCercanasPage,
    ProductoPage,
    InfoProductoPage,
    FarmaciaProductoPage,
    HomePage

  ],
  providers: [
    Diagnostic,
    StatusBar,
    SplashScreen,
    Geolocation,
    GoogleMaps,
    GoogleMapsProvider,
    CallNumber,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DireccionesProvider,
    LocationsProvider,
    Network
  ]
})
export class AppModule { }
