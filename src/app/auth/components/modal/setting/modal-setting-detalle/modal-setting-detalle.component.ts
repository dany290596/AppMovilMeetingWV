/** 
* DBR - Componentes propios de Angular
* */
import { Component, OnInit } from '@angular/core';

/** 
* DBR - Componentes propios de Ionic
* */
import { ModalController, LoadingController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

/** 
* DBR - Servicios
* */
import { PlataformaService } from 'src/app/shared/services/plataforma.service';

@Component({
  selector: 'app-modal-setting-detalle',
  templateUrl: './modal-setting-detalle.component.html',
  styleUrls: ['./modal-setting-detalle.component.scss'],
})
export class ModalSettingDetalleComponent implements OnInit {
  api: string = '';
  fecha: string = '';

  constructor(
    private srvNav: NavParams,
    private srvPlataforma: PlataformaService
  ) { }

  ngOnInit() {
    this.api = this.srvNav.get("api");
    let fechaActual = new Date();
    this.fecha = fechaActual.toLocaleString('es-MX');
  }
}