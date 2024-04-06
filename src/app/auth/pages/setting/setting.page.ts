/** 
* DBR - Componentes propios de Angular
* */
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

/** 
* DBR - Componentes propios de Ionic
* */
import { NavController, ActionSheetController, AlertController, ModalController } from '@ionic/angular';

/** 
* DBR - Servicios
* */
import { AlertService } from 'src/app/shared/services/alert.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastService } from 'src/app/shared/services/toast.service';

/** 
* DBR - Interfaces
* */
import { StorageResponse } from 'src/app/shared/interfaces/storage.interface';

/** 
* DBR - Modales
* */
import { ModalSettingDetalleComponent } from 'src/app/auth/components/modal/setting/modal-setting-detalle/modal-setting-detalle.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})

export class SettingPage implements OnInit {
  configuracionFG: FormGroup = this.srvFormBuilder.group({
    txtIdUrlApi: ['', [Validators.required]]
  });

  constructor(
    private srvFormBuilder: FormBuilder,
    private srvActionSheet: ActionSheetController,
    private srvNav: NavController,
    private srvStorage: StorageService,
    private srvAlert: AlertService,
    private srvModal: ModalController,
    private srvToast: ToastService
  ) { }

  ngOnInit() {
  }

  async guardarUrlApi() {
    if (this.validarControles('guardar')) {
      let formC = this.configuracionFG.value;
      let params: any = {
        urlApi: formC.txtIdUrlApi
      }

      let alertBox = await this.srvActionSheet.create({
        header: `¿Desea guardar la siguiente URL de conexión? ${params.urlApi}`,
        buttons: [
          {
            text: 'Cancelar',
            icon: 'trash-outline',
            role: 'cancelar'
          },
          {
            text: 'Si',
            icon: 'save-outline',
            handler: () => {
              this.crear(params.urlApi);
            }
          }
        ]
      });
      await alertBox.present();
    }
  }

  validarControles(peticion: string): boolean {
    if (peticion === 'guardar') {
      let form = this.configuracionFG.value;
      if (form.txtIdUrlApi === '' || form.txtIdUrlApi === undefined || form.txtIdUrlApi === null) { this.configuracionFG.controls['txtIdUrlApi'].markAsTouched(); return false; };
    }

    return true;
  }

  async crear(urlApi: string) {
    this.srvStorage.crear('urlapi', JSON.stringify(urlApi));
    this.srvAlert.alertSuccess(`La URL de conexión: ${urlApi} se guardo exitosamente.`);
    this.configuracionFG.reset();
    this.srvNav.navigateRoot('/auth/pages/login', { animated: true });
  }

  async verUrlApi() {
    await this.srvStorage.obtenerPorKey('urlapi').then(async (t: StorageResponse) => {
      if (t.value != null && t.value != "" && t.value != undefined) {
        //alert(`Hello ::::::::::: ` + JSON.stringify(t));
        //this.srvAlert.alertSuccess(`URL de conexión: ${t.value}`);
        const modal = await this.srvModal.create({
          component: ModalSettingDetalleComponent,
          initialBreakpoint: 0.25,
          breakpoints: [0, 0.25, 0.5, 0.75],
          handleBehavior: "cycle",
          mode: 'ios',
          componentProps: {
            'api': JSON.parse(t.value)
          }
        });
        modal.present();

        const { data, role } = await modal.onWillDismiss();

        if (role === 'confirm') {
          console.log(`Hello, ${data}!`);
        }
      } else {
        this.srvToast.primaryToast('No hay ninguna conexión guardada en este momento.');
      }
    });
  }

  showLogin() {
    this.srvNav.navigateRoot('/auth/pages/login', { animated: true });
  }
}