import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { ToolbarComponent } from '../pages/toolbar/toolbar.component'
import { NavigationMenuComponent } from '../pages/navigation-menu/navigation-menu.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {DesignerComponent} from '../pages/designer/designer.component'
import { HttpClientModule } from '@angular/common/http';
import { PropertiesComponent } from '../pages/properties/properties.component'
@NgModule({
  declarations: [
    MyApp,
    ToolbarComponent,
    NavigationMenuComponent,
    DesignerComponent,
    PropertiesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
