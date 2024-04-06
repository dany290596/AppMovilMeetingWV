/** 
* DBR - Componentes propios de Angular
* */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** 
* DBR - Componentes propios de Ionic
* */
import { IonicModule } from '@ionic/angular';

/** 
* DBR - Rutas
* */
import { SettingPageRoutingModule } from './setting-routing.module';

/** 
* DBR - Componentes propios de la Aplicación
* */
import { SettingPage } from './setting.page';

/** 
* DBR - Modulos
* */
import { AngularMaterialModule } from "src/app/shared/libraries/angular-material.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingPageRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  declarations: [SettingPage]
})

export class SettingPageModule { }