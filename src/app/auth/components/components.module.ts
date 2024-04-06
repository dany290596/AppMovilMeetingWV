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
import { ComponentsPageRoutingModule } from './components-routing.module';

/** 
* DBR - Componentes propios de la Aplicación
* */
import { ComponentsPage } from './components.page';

/** 
* DBR - Modales
* */
import { ModalSettingDetalleComponent } from 'src/app/auth/components/modal/setting/modal-setting-detalle/modal-setting-detalle.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsPageRoutingModule
  ],
  declarations: [
    ComponentsPage,
    ModalSettingDetalleComponent
  ]
})

export class ComponentsPageModule { }