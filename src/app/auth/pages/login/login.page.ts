/** 
* DBR - Componentes propios de Angular
* */
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder, UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

/** 
* DBR - Componentes propios de Ionic
* */
import { NavController, AlertController, LoadingController, Platform } from '@ionic/angular';

/** 
* DBR - Interfaces
* */
import { LoginRequest } from 'src/app/auth/interfaces/login.interface';
import { CommonResponse } from 'src/app/shared/interfaces/http.interface';
import { StorageResponse } from 'src/app/shared/interfaces/storage.interface';
import { MenuResponse, MenuChildrenResponse } from 'src/app/shared/interfaces/menu.interface';

/** 
* DBR - Servicios
* */
import { ToastService } from 'src/app/shared/services/toast.service';
import { LoginService } from 'src/app/auth/services/login.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UsuarioService } from 'src/app/auth/services/usuario.service';
import { JsonService } from 'src/app/protected/services/json.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  menuResponse: MenuResponse[] = [];
  menuChildrenResponse: MenuChildrenResponse[] = [];
  txtIdUsuarioMessage = "El campo es obligatorio";
  txtIdContrasenaMessage = "El campo es obligatorio";
  tipoPlataforma: string = "";
  usuarioPattern: any = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

  hide: boolean = true;

  loginFG: FormGroup = this.srvFormBuilder.group({
    usuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern(this.usuarioPattern)
    ])),
    contrasena: ['', [Validators.required]]
  });

  constructor(
    private srvPlatform: Platform,
    private srvFormBuilder: FormBuilder,
    private srvToast: ToastService,
    private srvLoading: LoadingController,
    private srvLogin: LoginService,
    private srvNav: NavController,
    private srvStorage: StorageService,
    private srvUsuario: UsuarioService,
    private srvJson: JsonService
  ) { }

  ngOnInit() {
    if (this.srvPlatform.is('android')) {
      this.tipoPlataforma = 'android';
      console.log("ANDROID => ", this.tipoPlataforma);
    } else if (this.srvPlatform.is('ios')) {
      this.tipoPlataforma = 'ios';
      console.log("IOS => ", this.tipoPlataforma);
    }
  }

  paramsLogin() {
    let formFM = this.loginFG.value;
    const params = new LoginRequest();
    params.email = formFM.usuario;
    params.contrasena = formFM.contrasena;
    return params;
  }

  mapearErrorControles() {
    this.loginFG.controls['usuario'].markAsTouched();
    this.loginFG.controls['contrasena'].markAsTouched();
  }

  validacionCampos(peticion: string): boolean {
    if (peticion === 'acceder') {
      var form = this.loginFG.value;
      if (form.usuario === '' || form.usuario === undefined || form.usuario === null) { this.alertaSwal('Email'); return false }
      if (form.contrasena === '' || form.contrasena === undefined || form.contrasena === null) { this.alertaSwal('Contraseña'); return false }
    }

    return true;
  }

  alertaSwal(campo: string) {
    this.srvToast.primaryToast(`El campo ${campo} es requerido`);
  }

  accederConCuenta() {
    this.mapearErrorControles();
    if (this.validacionCampos('acceder')) {
      const params = this.paramsLogin();
      //console.log("PARAMS ::: ", params);
      this.srvLoading.create({
        message: 'Accediendo ...'
      }).then(loadingEl => {
        this.srvStorage.obtenerPorKey('urlapi').then((urlapi: StorageResponse) => {
          if (urlapi.value != null && urlapi.value != "" && urlapi.value != undefined) {
            loadingEl.present();
            this.srvLogin.accederConCuenta(params, JSON.parse(urlapi.value)).subscribe((r: CommonResponse) => {
              //alert("ACCEDER CON CUENTA ::: " + JSON.stringify(r));
              if (r.data) {
                loadingEl.dismiss();
                this.srvStorage.obtenerPorKey('token').then((token: StorageResponse) => {
                  if (token.value != null && token.value != "" && token.value != undefined) {
                    this.srvUsuario.obtener(JSON.parse(urlapi.value), JSON.parse(token.value)).subscribe((x: CommonResponse) => {
                      //alert("GET USUARIO DATA ::: " + JSON.stringify(x));
                      if (x.data) {
                        this.srvNav.setDirection('root');
                        this.srvNav.navigateRoot('/protected/modulo-agenda/pages/cita-calendario');
                        this.srvToast.darkToast(r.mensaje);
                      } else {
                        this.srvToast.dangerToast('El host ha sido capaz de comunicarse con el servidor, pero no existe el recurso que ha sido pedido');
                      }
                    });
                  } else {
                    this.srvToast.warningToast('El token no existe');
                    this.srvStorage.cerrarSesion();
                  }
                });
              } else {
                loadingEl.dismiss();
                if (r.error) {
                  if (r.error.codigo) {
                    this.srvToast.warningToast('El correo y la contraseña son incorrectos');
                  }
                } else {
                }
              }
            });
          } else {
            this.srvToast.warningToast('Ingrese la URL de conexión en el apartado de configuración ');
            this.srvStorage.cerrarSesion();
          }
        });
      });
    }
  }

  urlConfiguracion() {
    this.srvNav.navigateRoot('/auth/pages/setting', { animated: true });
  }
}