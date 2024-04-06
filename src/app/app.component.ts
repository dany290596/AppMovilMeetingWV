/** 
* DBR - Componentes propios de Angular
* */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

/** 
* DBR - Componentes propios de Ionic
* */
import { Platform } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

/** 
* DBR - Servicios
* */
import { JsonService } from 'src/app/protected/services/json.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UsuarioService } from 'src/app/auth/services/usuario.service';

/** 
* DBR - Interfaces
* */
import { MenuResponse, MenuChildrenResponse } from 'src/app/shared/interfaces/menu.interface';
import { StorageResponse } from 'src/app/shared/interfaces/storage.interface';
import { CommonResponse } from 'src/app/shared/interfaces/http.interface';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  menuResponse: MenuResponse[] = [];
  menuChildrenResponse: MenuChildrenResponse[] = [];

  constructor(
    private srvPlatform: Platform,
    private srvRouter: Router,
    private srvMenu: MenuController,
    private srvStorage: StorageService,
    private srvJson: JsonService,
    private srvToast: ToastService,
    private srvUsuario: UsuarioService,
    private srvNav: NavController
  ) {
    // this.initializeApp();
  }

  async initializeApp() {
    this.srvPlatform.ready().then(() => {
    });
  }

  ngOnInit() {
    this.srvMenu.enable(false);
    this.srvStorage.obtenerPorKey('urlapi').then((urlapi: StorageResponse) => {
      if (urlapi.value != null && urlapi.value != "" && urlapi.value != undefined) {
        this.srvStorage.obtenerPorKey('token').then((token: StorageResponse) => {
          if (token.value != null && token.value != "" && token.value != undefined) {
            this.srvUsuario.obtener(JSON.parse(urlapi.value), JSON.parse(token.value)).subscribe((x: CommonResponse) => {
              //alert("GET USUARIO DATA ::: " + JSON.stringify(x));
              if (x.data) {
                //this.srvToast.darkToast("El token se ha generado correctamente");                
              } else {
                this.srvToast.warningToast('El token a caducado');
                this.cerrarSesion();
              }
            });
          } else {
            this.srvToast.warningToast('El token no existe');
            this.cerrarSesion();
          }
        });
      } else {
        this.srvToast.warningToast('Ingrese la URL de conexión en el apartado de configuración');
        this.cerrarSesion();
      }
    });

    this.obtenerSecciones();
  }

  obtenerSecciones() {
    this.srvJson.obtenerMenu().subscribe((r) => {
      if (r.length > 0) {
        this.menuResponse = r.map((m: any) => {
          return {
            MTitle: m.title,
            MUrl: m.url,
            MIcon: m.icon,
            MChildren: m.children.map((mc: any) => {
              return {
                MCTitle: mc.title,
                MCUrl: mc.url,
                MCIcon: mc.icon,
                MCName: mc.name
              } as MenuChildrenResponse;
            })
          } as MenuResponse;
        });
        console.log('Módulos y Submódulos => ', this.menuResponse);
      } else {
        this.srvToast.warningToast("No hay Módulos y Submódulos en este momento.");
      }
    });
  }

  abrirSeccion(url: any) {
    this.srvNav.setDirection('root');
    this.srvRouter.navigateByUrl(`${url.MCUrl}`);
    this.srvMenu.toggle();
  }

  abrirSeccionCuenta(url: any) {
    this.srvNav.setDirection('root');
    this.srvRouter.navigateByUrl(`${url}`);
    this.srvMenu.toggle();
  }

  inhabilitarCuenta() {
  }

  cerrarSesion() {
    this.srvStorage.cerrarSesion();
  }
}